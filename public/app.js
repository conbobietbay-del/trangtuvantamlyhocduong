// server.js
// Server đơn giản dùng Express để phục vụ website tĩnh (HTML/CSS/JS/nhạc/ảnh).
// Chạy được cả ở local (npm start) và trên Render.com (dùng process.env.PORT).

const express = require("express");
const path = require("path");

const app = express();

// Render.com sẽ tự cấp PORT qua biến môi trường, ở local sẽ chạy cổng 3000
const PORT = process.env.PORT || 3000;

// Phục vụ toàn bộ file trong thư mục hiện tại (index.html, style.css, /assets,...)
app.use(express.static(path.join(__dirname, "/")));

// Bất kỳ route nào không khớp file tĩnh -> trả về index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
