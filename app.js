const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config()

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM `users` WHERE 1', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});

