const { Chess } = require('chess.js');

// Giá trị quân cờ cơ bản
function getPieceValue(piece, x, y) {
    if (!piece) return 0;

    const baseValues = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 }; // nhân lên để rõ ràng
    let value = baseValues[piece.type] || 0;

    // Ưu tiên quân tốt tiến sâu
    if (piece.type === 'p') {
        value += piece.color === 'w' ? (6 - x) : (x - 1); // x: hàng (0 ở trên)
    }

    return piece.color === 'w' ? value : -value;
}

// Hàm đánh giá bàn cờ
function evaluateBoard(board) {
    let total = 0;

    const centerSquares = [
        [3, 3], [3, 4],
        [4, 3], [4, 4]
    ];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            let value = getPieceValue(piece, i, j);

            // Ưu tiên kiểm soát trung tâm mạnh hơn
            if (piece && centerSquares.some(([x, y]) => x === i && y === j)) {
                value += piece.color === 'w' ? 10 : -10;
            }

            total += value;
        }
    }

    return Math.round(total); // Làm tròn số nguyên
}

// Minimax với cắt tỉa Alpha-Beta
function minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) return evaluateBoard(game.board());

    const moves = game.moves({ verbose: true });

    if (isMaximisingPlayer) {
        let maxEval = -Infinity;
        for (const move of moves) {
            game.move(move);
            const eval = minimax(depth - 1, game, alpha, beta, false);
            game.undo();
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            game.move(move);
            const eval = minimax(depth - 1, game, alpha, beta, true);
            game.undo();
            minEval = Math.min(minEval, eval);
            beta = Math.min(beta, eval);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

// Hàm tìm nước đi tốt nhất
function findBestMove(fen, depth) {
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });

    let bestMove = null;
    let bestEval = -Infinity;
    const moveScores = [];

    for (const move of moves) {
        game.move(move);
        const eval = minimax(depth - 1, game, -Infinity, Infinity, false);
        game.undo();
        moveScores.push({
            move: `${move.from}${move.to}`,
            score: eval
        });
        if (eval > bestEval) {
            bestEval = eval;
            bestMove = move;
        }
    }

    console.log("Move scores:");
    moveScores.forEach(m => {
        console.log(`${m.move}: ${m.score}`);
    });

    return {
        bestMove: `${bestMove.from}${bestMove.to}`,
        scores: moveScores
    };
}

module.exports = {
    findBestMove
};
