const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // PostgreSQL pool connection

// GET /api/statistics/department-issues
router.get('/department-issues', async (req, res) => {
  try {
    const query = `
      SELECT 
        it.type_name AS department,  -- Using 'type_name' from the 'issue_type' table
        COUNT(*) AS total_issues,
        SUM(CASE WHEN i.status = 'resolved' THEN 1 ELSE 0 END) AS resolved_issues,
        SUM(CASE WHEN i.status != 'resolved' THEN 1 ELSE 0 END) AS pending_issues
      FROM issues i
      JOIN issue_type it ON i.issue_type_id = it.type_id  -- Corrected to use 'it.type_id'
      GROUP BY it.type_name
      ORDER BY it.type_name;  -- Sorting by 'type_name'
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching statistics:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
