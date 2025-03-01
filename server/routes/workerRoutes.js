const express = require('express');
const pool = require('../config/db'); // Import PostgreSQL connection
const router = express.Router();


// Get assigned tasks for a specific worker
router.get('/workers/:workerId/tasks', async (req, res) => {
  const { workerId } = req.params;
  try {
    // const { workerId } = req.params;
    // const workerId = parseInt(req.params.workerId, 10);
    const result = await pool.query(
        'SELECT * FROM issues WHERE assigned_worker = $1',[workerId]
        );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching worker tasks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update task status
router.put('/workers/:issueId/update-status', async (req, res) => {
  const { issueId } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE issues SET status = $1 WHERE issue_id = $2', [status, issueId]);
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


















































// const express = require('express');
// const pool = require('../config/db'); // Import PostgreSQL connection
// const router = express.Router();

// // Fetch Assigned Tasks for a Worker
// router.get("/:workerId/tasks", async (req, res) => {
//     try {
//       const { workerId } = req.params;
//       const result = await pool.query("SELECT * FROM issues WHERE assigned_worker = $1", [workerId]);
  
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "No tasks assigned to this worker" });
//       }
  
//       res.json(result.rows);
//     } catch (err) {
//       console.error("Error fetching worker tasks:", err.message);
//       res.status(500).send("Server error");
//     }
//   });
  
//   // Update Task Status (Worker Reports Completion)
//   router.put("/:issueId/update-status", async (req, res) => {
//     try {
//       // const { issueId, status } = req.body;
//       const { issueId } = req.params.issueId;
//       const { status } = req.body;

//       const result = await pool.query(
//         "UPDATE issues SET status = $1 WHERE issue_id = $2 RETURNING *",
//         [status, issueId]
//       );
  
//       if (result.rowCount === 0) {
//         return res.status(404).json({ error: "Issue not found" });
//       }
  
//       res.json({ success: true, message: "Status updated successfully!", issue: result.rows[0] });
//     } catch (err) {
//       console.error("Error updating status:", err.message);
//       res.status(500).send("Server error");
//     }
//   });
  
//   module.exports = router;
  