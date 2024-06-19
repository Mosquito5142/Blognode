const express = require('express');
const router = express.Router();
const connectDB = require('../connection');

router.get('/', async (req, res) => {
  try {
    const connection = await connectDB();
    const [postsResults] = await connection.query('SELECT `id`, `title`, `author`, `created_at`, `category` FROM `posts` WHERE 1');
    res.json(postsResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  const postId = req.params.id; // รับค่า id จาก URL parameter

  try {
    const connection = await connectDB();
    const [postResults] = await connection.query('SELECT * FROM `posts` WHERE id = ?', [postId]);

    if (postResults.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(postResults[0]); // ส่งข้อมูลโพสท์ที่พบกลับไปในรูปแบบ JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
