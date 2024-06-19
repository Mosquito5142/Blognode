const express = require('express');
const router = express.Router();
const connectDB = require('../connection');

router.get('/', async (req, res) => {
  try {
    const connection = await connectDB();
    const [postsResults] = await connection.query('SELECT * FROM `posts` WHERE 1');
    res.json(postsResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
