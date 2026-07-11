// server.js
// Máy chủ Express đơn giản, phục vụ trang tĩnh (HTML/CSS/JS) trong thư mục /public.
// Sẵn sàng để deploy trên Render.com (đọc PORT từ biến môi trường).

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ toàn bộ file tĩnh trong thư mục "public" (index.html, style.css, app.js, ảnh, nhạc...)
app.use(express.static(path.join(__dirname, "public")));

// Cho phép nhận JSON nếu sau này bạn muốn ghi log kết quả về server
app.use(express.json());

// (Tuỳ chọn) API nhỏ để ghi nhận khi hệ thống phát hiện điểm số bất thường.
// Hiện tại chỉ log ra console — bạn có thể nối vào email/Google Sheet/DB thật sau này.
app.post("/api/canh-bao", (req, res) => {
  const { mucDo, thoiGian } = req.body || {};
  console.log(`[CẢNH BÁO TÂM LÝ] Mức độ: ${mucDo || "không rõ"} - Thời gian: ${thoiGian || new Date().toISOString()}`);
  res.json({ ok: true });
});

// Mọi route khác (SPA) đều trả về index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
