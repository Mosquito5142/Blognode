const express = require('express');
const router = express.Router();
const pool = require('../connection');

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [usersResults] = await connection.query('SELECT * FROM `users` WHERE 1');
    connection.release();
    res.json(usersResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
