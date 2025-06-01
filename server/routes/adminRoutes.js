const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// 1. Login: Fetch admin_id
router.post('/get-admin-id', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    const { rows } = await pool.query(
      'SELECT admin_id FROM admin WHERE email = $1 LIMIT 1',
      [email]
    );
    if (!rows.length) return res.status(404).json({ error: 'Admin not found' });
    res.json({ admin_id: rows[0].admin_id });
  } catch (err) {
    console.error('DB Error [get-admin-id]:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Get all issues (front-end filters by department/ID)
router.get('/issues', async (req, res) => {
  const { departmentId } = req.query;
  try {
    const { rows } = await pool.query(`
      SELECT i.issue_id, i.citizen_id, i.issue_type_id, 
      i.description, i.location, i.status, 
      a.worker_id AS assigned_worker_id, 
      w.name AS assigned_worker_name FROM issues i 
      LEFT JOIN assignment a ON i.issue_id = a.issue_id 
      LEFT JOIN worker w ON a.worker_id = w.worker_id 
      where i.issue_type_id=$1 
      ORDER BY i.issue_id DESC`, [departmentId]);
    res.json(rows);
  } catch (err) {
    console.error('DB Error [get issues]:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// // 3. Get workers, optionally filter by type
router.get('/workers', async (req, res) => {
  const { departmentId } = req.query;
  try {
    let query = 'SELECT worker_id, name, email, phone, issue_type_id FROM worker where issue_type_id = $1';
    const { rows } = await pool.query(query, [departmentId]);  // Using departmentId to filter workers
    res.json(rows);  // Return workers that match the department
    let params = [];
  } catch (err) {
    console.error('DB Error [get workers]:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. Manual assignment
router.post('/assign-task', async (req, res) => {
  const { issue_id, admin_id, worker_id } = req.body;
  if (!issue_id || !admin_id || !worker_id) {
    return res.status(400).json({ error: 'issue_id, admin_id, worker_id required' });
  }
  try {
    await pool.query(`SELECT assign_task($1, $2, $3)`, [issue_id, admin_id, worker_id]);
    res.json({ message: 'Task assigned' });
  } catch (err) {
    console.error('DB Error [assign-task]:', err);
        if (!res.headersSent) {
          return res.status(400).json({
            message: err.message.includes('already assigned')
              ? 'This worker is already assigned to another task. Please choose a free worker.'
              : 'Error assigning worker'
          });
        }
    
  }
});

// 6. Get Department-Specific Workers
router.get('/workers', async (req, res) => {
  const { departmentId } = req.query;
  if (!departmentId) return res.status(400).json({ error: 'departmentId is required' });
  try {
    const result = await pool.query(
      'SELECT * FROM get_workers_by_issue_type($1)',
      [departmentId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error [get workers]:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// // 7.for updating status of issue from admin view 
router.put('/issues/update-status', async (req, res) => {
  const { issueId, status, admin_id } = req.body;

  try {
    console.log("Received update request body:", req.body);
    const adminIdInt = parseInt(admin_id);

    // Verify admin exists
    const admin = await pool.query('SELECT * FROM admin WHERE admin_id = $1', [adminIdInt]);
    if (admin.rowCount === 0) {
      return res.status(400).json({ message: "Invalid admin ID====" });
    }
    console.log(admin);
    // Use admin_id as departmentId
    const result = await pool.query(
      'SELECT admin_update_issue_status($1, $2, $3) AS message',
      [adminIdInt, issueId, status]
    );

    console.log('DB result:', result.rows[0].message);
    res.json({ message: result.rows[0].message });
  } catch (err) {
    console.error('Error updating issue status from admin:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/all-issues', async (req, res) => {
  try {
    const assignedQuery = `SELECT * FROM admin_assignments_view`;
    const unassignedQuery = `SELECT * FROM unassigned_issues_view`;

    const [assignedResult, unassignedResult] = await Promise.all([
      pool.query(assignedQuery),
      pool.query(unassignedQuery)
    ]);

    res.json({
      assigned: assignedResult.rows,
      unassigned: unassignedResult.rows
    });
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;



module.exports = router;
