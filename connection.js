const mysql = require('mysql2/promise');
const connectionConfig = require('./connectionConfig');

const pool = mysql.createPool(connectionConfig);

const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL database.');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

module.exports = pool;
