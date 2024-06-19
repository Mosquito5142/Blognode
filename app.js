const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Using mysql2/promise for cleaner syntax

require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 4000, // Explicitly define port for clarity (assuming in config)
  ssl: {
    rejectUnauthorized: true, // Enforce SSL verification
  },
};

(async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to the MySQL database.');

    app.get('/users', async (req, res) => {
      try {
        const [results] = await connection.query('SELECT * FROM `users` WHERE 1');
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(3000, () => {
      console.log('CORS-enabled web server listening on port 3000');
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();