TIKTOK LIVE TIMER — 2 PHONE VERSION

สิ่งที่มี:
- /remote.html = มือถือ 2 สำหรับกดเพิ่ม/ลดเวลา
- /overlay.html = หน้าจอเวลาสำหรับเอาไปใส่เป็น Web/Browser Source ในโปรแกรมไลฟ์
- / = หน้าเมนู
- /health = ตรวจเซิร์ฟเวอร์
- WebSocket /ws = ซิงก์เวลาแบบเรียลไทม์

การ deploy แบบง่าย:
1. สร้าง GitHub repository ใหม่
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ โดยให้ server.js และ package.json อยู่ root และมีโฟลเดอร์ public
3. เข้า Render -> New -> Web Service -> เชื่อม repository
4. Runtime: Node
5. Build Command: npm install
6. Start Command: npm start
7. เลือก Free สำหรับทดลอง
8. หลัง deploy ได้ URL เช่น https://ชื่อโปรเจกต์.onrender.com
9. เครื่อง 2 เปิด https://.../remote.html
10. เครื่องที่ส่งภาพไลฟ์เปิด https://.../overlay.html แล้วนำ URL นี้ไปเป็น Web/Browser Source ของซอฟต์แวร์ไลฟ์ที่รองรับ

ข้อจำกัด:
- Free Web Service อาจหยุดเมื่อไม่มีการใช้งาน จึงเหมาะกับทดลองก่อน
- เวลาใน RAM ของเซิร์ฟเวอร์จะรีเซ็ตเมื่อ service ถูกรีสตาร์ต/deploy
- ระบบนี้เป็นตัวจับเวลา/รีโมต ไม่ได้อ่าน TikTok gifts อัตโนมัติ คุณกด +/− เองเมื่อเห็นของขวัญ
