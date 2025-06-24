# ♟️ Backend API – Ứng dụng Cờ Vua vs AI

Đây là **backend Node.js** cho một dự án chơi cờ vua giữa người và AI. Backend này sử dụng thư viện `chess.js` để xử lý luật chơi cờ vua và hỗ trợ API để frontend gửi nước đi và nhận phản hồi từ AI.
> Một backend đơn giản sử dụng `Node.js + Express` kết hợp thư viện `chess.js` để triển khai trò chơi cờ vua.
> API hỗ trợ tạo ván chơi, xử lý nước đi người chơi, và phản hồi nước đi AI ngẫu nhiên.

## 📌 Mục tiêu

-  Tạo ván chơi mới (`POST /api/game/new`)
-  Gửi nước đi người chơi (`POST /api/game/move`)
-  Trả về nước đi AI và trạng thái bàn cờ (FEN)

🔧 Cài đặt
npm install
▶Chạy server
node server.js
Server sẽ chạy tại http://localhost:5000.
### Chi tiết

**1. server.js**

Tạo một server chạy cờ vua với AI sử dụng Node.js + Express.

Người chơi gửi nước đi, AI sẽ phản ứng lại. Mọi xử lý diễn ra phía server.
**2.logic.js**

Quản lý nhiều ván cờ vua, mỗi ván tương ứng với một người chơi (hoặc một session).

**3.gameSession.js**

Quản lý các ván cờ riêng biệt cho từng người chơi bằng cách sử dụng một session ID.

Nó làm 3 việc chính:

Tạo ván chơi mới.

Lấy ván chơi theo ID.

Cập nhật lại ván chơi.

**4.gameRoutes.js**

Đây là định nghĩa các đường dẫn API (gọi là route) để:

Tạo ván cờ mới

➡Gửi nước đi của người chơi và nhận phản hồi của AI

**5.gameController.js**

Tạo một ván cờ mới và cho phép người chơi đi quân, sau đó AI sẽ đi lại, tất cả diễn ra trên server.

