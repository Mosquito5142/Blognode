const express = require('express');
const router = express.Router();
const connectDB = require('../connection');
const bodyParser = require('body-parser');

// Use body-parser middleware in the router with increased limit
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

router.get('/', async (req, res) => {
  try {
    const connection = await connectDB();
    const [postsResults] = await connection.query('SELECT `id`, `title`, `author`, `updated_at`, `category`,`image` FROM `posts` WHERE 1');
    res.json(postsResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const connection = await connectDB();
    const [postResults] = await connection.query('SELECT * FROM `posts` WHERE id = ?', [postId]);

    if (postResults.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(postResults[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/addposts', async (req, res) => {
  const {
    title,
    content,
    author,
    created_at,
    updated_at,
    category,
    tags,
    image,
  } = req.body;

  try {
    const connection = await connectDB();
    const query = `
      INSERT INTO posts (title, content, author, created_at, updated_at, category, tags, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [title, content, author, created_at, updated_at, category, tags, image];
    await connection.query(query, values);

    res.status(201).json({ message: 'Post added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const postId = req.params.id;
  const {
    title,
    content,
    author,
    updated_at,
    category,
    tags,
    image,
  } = req.body;

  try {
    const connection = await connectDB();
    const query = `
      UPDATE posts
      SET title = ?, content = ?, author = ?, updated_at = ?, category = ?, tags = ?, image = ?
      WHERE id = ?
    `;
    const values = [title, content, author, updated_at, category, tags, image, postId];
    const [result] = await connection.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const connection = await connectDB();
    const [result] = await connection.query('DELETE FROM posts WHERE id = ?', [postId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
