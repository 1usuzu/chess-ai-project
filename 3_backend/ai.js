const { getGame } = require("./logic");

function getBestMove(sessionId) {
  const game = getGame(sessionId);

  if (!game || typeof game.moves !== 'function') {
    console.error("❌ Không tìm thấy ván chơi cho session:", sessionId);
    return null;
  }

  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * moves.length);
  return {
    from: moves[randomIndex].from,
    to: moves[randomIndex].to
  };
}

module.exports = { getBestMove };
