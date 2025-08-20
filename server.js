const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 خدمة ملفات HTML و Static
app.use(express.static(path.join(__dirname, "public")));

// 🔹 إعداد Proxy للبث HLS من Vultr
app.use(
  "/hls",
  createProxyMiddleware({
    target: "http://155.138.225.232:8080",   // ⬅️ هنا سيرفر Vultr
    changeOrigin: true,
    pathRewrite: { "^/hls": "/hls" },
    ws: true,
  })
);

// 🔹 الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 صفحة التحقق (البث)
app.get("/verification.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "verification.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
