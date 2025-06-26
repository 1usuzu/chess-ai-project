const { Chess } = require('chess.js');
const { minimax } = require('./minimax');
const { getPieceBaseValue } = require('./evaluate');

function findBestMove(fen, depth) {
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });

    let bestMove = null;
    let bestEval = -Infinity;
    const moveScores = [];

    for (const move of moves) {
        game.move(move);

        try {
            // Đánh giá điểm hiện tại từ minimax
            let evalBeforeBonus = minimax(depth - 1, game, -Infinity, Infinity, false);
            let evalAfterBonus = evalBeforeBonus;

            // Nếu nước đi ăn quân, cộng thêm điểm bonus
            if (move.captured) {
                const captureValue = getPieceBaseValue(move.captured);
                const bonus = captureValue * 2;

                console.log(`-> Move ${move.from}${move.to} captures ${move.captured}`);
                console.log(`   Eval before bonus: ${evalBeforeBonus}`);
                console.log(`   Capture bonus: ${bonus}`);

                evalAfterBonus += bonus;

                console.log(`   Eval after bonus: ${evalAfterBonus}`);
            }

            moveScores.push({
                move: `${move.from}${move.to}`,
                score: evalAfterBonus
            });

            console.log(`Move ${move.from}${move.to} → Final Eval: ${evalAfterBonus}\n`);

            if (evalAfterBonus > bestEval) {
                bestEval = evalAfterBonus;
                bestMove = move;
            }
        } finally {
            game.undo();
        }
    }

    return {
        bestMove: bestMove ? `${bestMove.from}${bestMove.to}` : null,
        scores: moveScores
    };
}

module.exports = {
    findBestMove
};
