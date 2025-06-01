const express = require("express");
const pool = require("../config/db");
const router = express.Router();

const getCitizenId = async (email) => {
    try {
      //const [rows] = await pool.execute("SELECT citizen_id FROM citizens WHERE email = ? LIMIT 1", [email]);
      const result = await pool.query(
        "SELECT citizen_id FROM citizens WHERE email = $1 LIMIT 1",
        [email]
      );
      const rows = result.rows;
      
    
      
      return rows.length > 0 ? rows[0].citizen_id : null;
    } catch (error) {
      console.error("Database Error:", error);
      return null;
    }
  };
  
  router.post("/get-citizen-id", async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    const citizenId = await getCitizenId(email);
    if (citizenId) {
      return res.json({ citizen_id: citizenId });
    } else {
      return res.status(404).json({ error: "Citizen not found" });
    }
  });
  module.exports = router;