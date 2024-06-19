const express = require('express');
const router = express.Router();
const connectDB = require('../connection');

router.get('/', async (req, res) => {
  try {
    const connection = await connectDB();
    const [usersResults] = await connection.query('SELECT * FROM `users` WHERE 1');
    res.json(usersResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
