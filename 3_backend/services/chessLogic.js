// services/chessLogic.js
const { Chess } = require("chess.js");

const games = {};

// Hàm tạo game mới với sessionId
const createGame = (sessionId) => {
  const game = new Chess();
  games[sessionId] = game;
  return game.fen(); // trả về trạng thái bàn cờ
};

// Lấy đối tượng game theo session
const getGame = (sessionId) => {
  return games[sessionId] || null;
};

// Áp dụng nước đi
const applyMove = (sessionId, move) => {
  const game = games[sessionId];
  if (!game) return false;
  const result = game.move(move);
  return !!result;
};

// Lấy trạng thái bàn cờ FEN
const getFEN = (sessionId) => {
  const game = games[sessionId];
  if (!game) return null;
  return game.fen();
};

module.exports = {
  createGame,
  getGame,        // ⬅️ thêm dòng này
  applyMove,
  getFEN
};
