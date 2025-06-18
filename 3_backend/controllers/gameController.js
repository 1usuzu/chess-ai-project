const { createSession, getSession, updateSession } = require("../sessions/gameSessions");
const { getBestMove } = require("../services/chessAI");
const { applyMove, getFEN } = require("../services/chessLogic");

const createGame = (req, res) => {
  const sessionId = createSession(); // tạo session cờ mới
  const board = getFEN(sessionId);   // lấy trạng thái bàn cờ
  res.json({ sessionId, board });    // trả về cho client
};

const makeMove = (req, res) => {
  const { sessionId, move } = req.body;
  const game = getSession(sessionId);
  if (!game) return res.status(404).json({ error: "Session not found" });

  const isValid = applyMove(game, move); // người chơi đi
  if (!isValid) return res.status(400).json({ error: "Invalid move" });

  const aiMove = getBestMove(game);      // AI đi
  applyMove(game, aiMove);

  updateSession(sessionId, game);        // cập nhật lại ván cờ

  res.json({ board: game.fen(), aiMove });
};

module.exports = { createGame, makeMove };
