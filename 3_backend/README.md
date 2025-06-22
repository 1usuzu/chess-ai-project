# ♟️ Backend API – Ứng dụng Cờ Vua vs AI

Đây là **backend Node.js** cho một dự án chơi cờ vua giữa người và AI. Backend này sử dụng thư viện `chess.js` để xử lý luật chơi cờ vua và hỗ trợ API để frontend gửi nước đi và nhận phản hồi từ AI.

---

## 📌 Mục tiêu chính

- ✅ Tạo ván chơi mới (`POST /api/game/new`)
- ✅ Gửi nước đi người chơi (`POST /api/game/move`)
- ✅ Trả về nước đi AI và trạng thái bàn cờ (FEN)
- 🧠 AI hiện tại chỉ **chọn nước đi ngẫu nhiên** (có thể nâng cấp thành Minimax)

---

## 🗂️ Cấu trúc dự án

```bash
backend/
│
├── server.js            # Express API - điểm vào chính
├── logic.js             # Xử lý trạng thái game, FEN, nước đi
├── ai.js                # Tìm nước đi AI (hiện tại là random)
├── sessions/            # (Tùy chọn) Quản lý phiên chơi cờ
│   └── gameSessions.js
├── controllers/         # (Tùy chọn) Tách xử lý logic controller
│   └── gameController.js
├── routes/              # (Tùy chọn) Tách định tuyến API
│   └── gameRoutes.js
