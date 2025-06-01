const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const { name, email, phone, address, role, issue_type_id } = req.body;

  try {
    if (role === 'citizen') {
      await pool.query(
        'INSERT INTO citizens (name, email, phone, address) VALUES ($1, $2, $3, $4)',
        [name, email, phone, address]
      );
    } else if (role === 'admin') {
      await pool.query(
        'INSERT INTO admin (name, email, phone) VALUES ($1, $2, $3)',
        [name, email, phone]
      );
    } else if (role === 'worker') {
      await pool.query(
        'INSERT INTO worker (name, email, phone, issue_type_id) VALUES ($1, $2, $3, $4)',
        [name, email, phone, issue_type_id]
      );
    } else {
      return res.status(400).json({ error: 'Invalid role selected' });
    }

    res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error during registration' });
  }
});

module.exports = router;


