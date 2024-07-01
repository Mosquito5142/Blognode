# ใช้ Node.js image เป็น base image
FROM node:16-alpine

# ตั้งค่า working directory ใน container
WORKDIR /usr/src/app

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ปัจจุบันไปที่ working directory ใน container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# เปิด port 3000
EXPOSE 3000

# สั่งให้แอปพลิเคชันรัน
CMD ["npm", "start"]

