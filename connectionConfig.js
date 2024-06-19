require('dotenv').config();
module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 4000, // Explicitly define port for clarity (assuming in config)
  ssl: {
    rejectUnauthorized: true, // Enforce SSL verification
  },
};
