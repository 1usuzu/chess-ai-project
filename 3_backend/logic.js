
const { Chess } = require("chess.js");

const games = {}; // chứa tất cả ván chơi với sessionId

// Hàm tạo game mới
const createGame = (sessionId) => {
  const game = new Chess();
  games[sessionId] = game;
  return game.fen();
};

// Lấy game theo sessionId
const getGame = (sessionId) => games[sessionId] || null;

// Áp dụng nước đi
const applyMove = (sessionId, move) => {
  const game = games[sessionId];
  if (!game) return false;
  const result = game.move(move);
  return !!result;
};

// Lấy trạng thái bàn cờ
const getFEN = (sessionId) => {
  const game = games[sessionId];
  return game ? game.fen() : null;
};

// Export tất cả
module.exports = {
  createGame,
  getGame,
  applyMove,
  getFEN
};
