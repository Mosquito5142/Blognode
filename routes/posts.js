const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bodyParser = require('body-parser');

// Use body-parser middleware in the router with increased limit
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [postsResults] = await connection.query('SELECT `id`, `title`, `author`, `updated_at`, `category`,`image` FROM `posts` ORDER BY `id` DESC');
    connection.release();
    res.json(postsResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [postResults] = await connection.query('SELECT * FROM `posts` WHERE id = ?', [postId]);
    connection.release();

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
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO posts (title, content, author, created_at, updated_at, category, tags, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [title, content, author, created_at, updated_at, category, tags, image];
    await connection.query(query, values);
    connection.release();

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
    const connection = await pool.getConnection();
    const query = `
      UPDATE posts
      SET title = ?, content = ?, author = ?, updated_at = ?, category = ?, tags = ?, image = ?
      WHERE id = ?
    `;
    const values = [title, content, author, updated_at, category, tags, image, postId];
    const [result] = await connection.query(query, values);
    connection.release();

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
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM posts WHERE id = ?', [postId]);
    connection.release();

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
