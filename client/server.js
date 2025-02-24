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
    console.log("✅ Connected Successfully"); //terminal check
    client.release();
  })
  .catch(err => console.error("❌ Database Connection Error:", err));

app.get("/", (req, res) => {
  res.send("✅ Connected Successfully.."); // frontend display
});

// API Route to Report an Issue
app.post("/report", async (req, res) => {
  try {
    const { issueType, location } = req.body;
    const newIssue = await pool.query(
      "INSERT INTO issues (issue_type, reported_at, status) VALUES ($1, $2, $3) RETURNING *",
      [issueType, location, "Pending"] // Default status: Pending
    );
    res.json(newIssue.rows[0]); // Send back the inserted row
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// API to Receive Data & Save to PostgreSQL
app.post("/submit", async (req, res) => {
  const { id, name, email, phone, address } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO citizens (citizen_id, name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, name, email, phone, address]
    );
    res.json({ success: true, message: "Data saved successfully!", data: result.rows[0] });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ success: false, message: "Database error", error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
