const express = require('express');
const pool = require('../config/db'); // Import PostgreSQL connection
const router = express.Router();

const getWorkerId = async (email) => {
  try {
    const result = await pool.query(
      "SELECT worker_id FROM worker WHERE email = $1 LIMIT 1",
      [email]
    );
    const rows = result.rows; 
    console.log(rows);
    return rows.length > 0 ? rows[0].worker_id : null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
};
  router.post("/get-worker-id", async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    const workerId = await getWorkerId(email);
    if (workerId) {
      return res.json({ worker_id: workerId });
    } else {
      return res.status(404).json({ error: "Worker not found" });
    }
  });
  module.exports = router;


// Get assigned tasks for a specific worker
router.get('/:workerId/tasks', async (req, res) => {
  const { workerId } = req.params;
  try {
    const result = await pool.query(
        // 'SELECT * FROM assignment WHERE worker_id = $1',[workerId]
        'SELECT * FROM get_worker_tasks($1)', [workerId]
        );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching worker tasks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update task status
router.put('/:workerId/issues/:issueId/update-status', async (req, res) => {
  const { workerId, issueId } = req.params;
  const { status } = req.body;


  try {
    const result = await pool.query(
      'SELECT update_issue_status($1, $2, $3) AS message',
      [issueId, workerId, status]
    );
    res.json({ message: result.rows[0].message });
  } catch (err) {
    console.error('Error updating issue status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


// Get worker details (ID, name, email)
router.get('/:workerId/details', async (req, res) => {
  const { workerId } = req.params;
  try {
    const result = await pool.query(
      'SELECT worker_id, name, email FROM worker WHERE worker_id = $1',
      [workerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json(result.rows[0]); // Send worker details
  } catch (err) {
    console.error('Error fetching worker details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});