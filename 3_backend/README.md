# ♟️ Backend API – Ứng dụng Cờ Vua vs AI

Đây là **backend Node.js** cho một dự án chơi cờ vua giữa người và AI. Backend này sử dụng thư viện `chess.js` để xử lý luật chơi cờ vua và hỗ trợ API để frontend gửi nước đi và nhận phản hồi từ AI.
> Một backend đơn giản sử dụng `Node.js + Express` kết hợp thư viện `chess.js` để triển khai trò chơi cờ vua.
> API hỗ trợ tạo ván chơi, xử lý nước đi người chơi, và phản hồi nước đi AI ngẫu nhiên.

## 📌 Mục tiêu

- ✅ Tạo ván chơi mới (`POST /api/game/new`)
- ✅ Gửi nước đi người chơi (`POST /api/game/move`)
- ✅ Trả về nước đi AI và trạng thái bàn cờ (FEN)

🔧 Cài đặt
npm install
▶️ Chạy server
node server.js
Server sẽ chạy tại http://localhost:5000.
### Chi tiết
**1. server.js**
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createGame, applyMove, getFEN } = require('./logic');
const { getBestMove } = require('./ai');
-Để khai báo các thư viện cần thiết và import các hàm từ logic.js và ai.js.

app.post('/api/game/new', (req, res) => {
const sessionId = Date.now().toString();
const board = createGame(sessionId);
res.json({ sessionId, board });
});
-API /api/game/new: tạo ván cờ mới, trả về sessionId và board dưới dạng chuỗi FEN (mô tả trạng thái bàn cờ).

app.post('/api/game/move', (req, res) => {
const { sessionId, move } = req.body;
const success = applyMove(sessionId, move);

if (!success) return res.status(400).json({ error: 'Nước đi không hợp lệ' });
const aiMove = getBestMove(sessionId); 
applyMove(sessionId, aiMove);

res.json({ board: getFEN(sessionId), aiMove });
});
-API /api/game/move:
Nhận nước đi từ người chơi,
Gọi AI để chọn nước đi phản hồi,
Trả lại bàn cờ mới và nước đi AI.
**2. logic.js**
const { Chess } = require("chess.js");
const games = {}; // Lưu ván cờ theo sessionId
-Dùng thư viện chess.js để xử lý trạng thái bàn cờ.
-Mỗi session là 1 đối tượng Chess.

const createGame = (sessionId) => {
 const game = new Chess();
 games[sessionId] = game;
 return game.fen();
};
-Tạo game mới và lưu lại theo sessionId.

const applyMove = (sessionId, move) => {
  const game = games[sessionId];
  if (!game) return false;
  const result = game.move(move);
  return !!result;
};
-Áp dụng nước đi vào ván cờ tương ứng session.

const getFEN = (sessionId) => {
  const game = games[sessionId];
  return game ? game.fen() : null;
};
-Trả về FEN (dùng để frontend load bàn cờ).



