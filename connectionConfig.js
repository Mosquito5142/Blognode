require('dotenv').config();

module.exports = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 4000, // หรือพอร์ตที่คุณใช้
    waitForConnections: true,
    connectionLimit: 10, // จำนวนการเชื่อมต่อสูงสุดใน pool
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true, // ใช้ SSL verification ถ้าจำเป็น
    },
};
