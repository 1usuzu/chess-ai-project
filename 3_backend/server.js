// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createGame, applyMove, getFEN } = require('./services/chessLogic');
const { getBestMove } = require('./services/chessAI');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// API: Tạo game mới
app.post('/api/game/new', (req, res) => {
  const sessionId = Date.now().toString();
  const board = createGame(sessionId);
  res.json({ sessionId, board });
});

// API: Gửi nước đi, trả lại nước đi của AI
app.post('/api/game/move', (req, res) => {
  const { sessionId, move } = req.body;

  const success = applyMove(sessionId, move);
  if (!success) return res.status(400).json({ error: 'Nước đi không hợp lệ' });

  // Lấy nước đi AI 
  const aiMove = getBestMove(sessionId); 
  applyMove(sessionId, aiMove);

  res.json({ board: getFEN(sessionId), aiMove });
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
