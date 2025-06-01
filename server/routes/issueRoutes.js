const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Report an Issue (Citizen View)
router.post("/report", async (req, res) => {
  try {
    const { citizenId, issueTypeId, description, location } = req.body;
    // get all issue types and their id
    await pool.query("SELECT report_issue($1, $2, $3, $4)", [
      citizenId,
      issueTypeId,
      description,
      location
    ]);
    res.status(201).json({ message: "Issue reported successfully!" });
  } catch (err) {
    console.error("Error reporting issue:", err.message);
    res.status(500).send("Server error");
  }
});

router.get("/issue-types", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM issue_type");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching issue types:", err.message);
    res.status(500).send("Server error");
  }
});

// Fetch Issues for Citizen View
router.get("/:citizenId", async (req, res) => {
  try {
    const { citizenId } = req.params;
    console.log(citizenId)
    const result = await pool.query("SELECT * FROM get_citizen_issues($1)", [citizenId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching issues:", err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;