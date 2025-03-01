const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(client => {
    console.log("✅ Connected Successfully");
    client.release();
  })
  .catch(err => console.error("❌ Database Connection Error:", err));

app.get("/", (req, res) => {
  res.send("✅ Connected Successfully..");
});

// Report an Issue (Citizen View)
app.post("/report", async (req, res) => {
  try {
    const { citizenId, issueType, description, location } = req.body;

    const newIssue = await pool.query(
      "INSERT INTO issues (citizen_id, issue_type, description, location, status, assigned_worker) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [citizenId, issueType, description, location, "Pending", null] // 'Pending' status, no worker assigned
    );

    res.json(newIssue.rows[0]);
  } catch (err) {
    console.error("Error reporting issue:", err.message);
    res.status(500).send("Server error");
  }
});


// Fetch Issues for Citizen View
app.get("/issues/:citizenId", async (req, res) => {
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
app.get("/issues", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM issues");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching all issues:", err.message);
    res.status(500).send("Server error");
  }
});

// Assign Issue to Worker (Admin Functionality)
app.post("/assign", async (req, res) => {
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

// Fetch Assigned Tasks for a Worker
app.get("/worker-tasks/:workerId", async (req, res) => {
  try {
    const { workerId } = req.params;
    const result = await pool.query("SELECT * FROM issues WHERE assigned_worker = $1", [workerId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No tasks assigned to this worker" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching worker tasks:", err.message);
    res.status(500).send("Server error");
  }
});

// Update Task Status (Worker Reports Completion)
app.post("/update-status", async (req, res) => {
  try {
    const { issueId, status } = req.body;

    const result = await pool.query(
      "UPDATE issues SET status = $1 WHERE issue_id = $2 RETURNING *",
      [status, issueId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json({ success: true, message: "Status updated successfully!", issue: result.rows[0] });
  } catch (err) {
    console.error("Error updating status:", err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

