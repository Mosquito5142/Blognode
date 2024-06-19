const mysql = require('mysql2/promise');
const connectionConfig = require('./connectionConfig');

let connection;

const connectDB = async () => {
  if (!connection) {
    connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to the MySQL database.');
  }
  return connection;
};

module.exports = connectDB;
