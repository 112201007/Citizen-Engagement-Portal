const cors = require("cors");
const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Report an Issue (Citizen View)
router.post("/report", async (req, res) => {
  try {
    const { citizenId, issueType, description, location } = req.body;
    const newIssue = await pool.query(
      "INSERT INTO issues (citizen_id, issue_type, description, location, status, assigned_worker) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [citizenId, issueType, description, location, "Pending", null]
    );
    res.json(newIssue.rows[0]);
  } catch (err) {
    console.error("Error reporting issue:", err.message);
    res.status(500).send("Server error");
  }
});

// Fetch Issues for Citizen View
router.get("issues/:citizenId", async (req, res) => {
  try {
    const { citizenId } = req.params;
    const result = await pool.query("SELECT * FROM issues WHERE citizen_id = $1", [citizenId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching issues:", err.message);
    res.status(500).send("Server error");
  }
});

// Fetch All Issues (Admin View)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM issues");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching all issues:", err.message);
    res.status(500).send("Server error");
  }
});

// Assign Issue to Worker (Admin Functionality)
router.post("/assign", async (req, res) => {
  try {
    const { issueId, workerId } = req.body;
    const result = await pool.query(
      "UPDATE issues SET assigned_worker = $1, status = $2 WHERE issue_id = $3 RETURNING *",
      [workerId, "Assigned", issueId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json({ success: true, message: "Issue assigned successfully!", issue: result.rows[0] });
  } catch (err) {
    console.error("Error assigning issue:", err.message);
    res.status(500).send("Server error");
  }
});
module.exports =router;

