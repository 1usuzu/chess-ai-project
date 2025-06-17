const { Chess } = require('chess.js');

// Đánh giá điểm quân cờ
function getPieceValue(piece, x, y) {
    if (!piece) return 0;
    const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    const value = values[piece.type] || 0;
    return piece.color === 'w' ? value : -value;
}

// Đánh giá bàn cờ
function evaluateBoard(board) {
    let total = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            total += getPieceValue(board[i][j], i, j);
        }
    }
    return total;
}

// Minimax với Alpha-Beta
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

// Hàm chính: Tìm nước đi tốt nhất từ FEN
function findBestMove(fen, depth) {
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });

    let bestMove = null;
    let bestEval = -Infinity;

    for (const move of moves) {
        game.move(move);
        const eval = minimax(depth - 1, game, -Infinity, Infinity, false);
        game.undo();
        if (eval > bestEval) {
            bestEval = eval;
            bestMove = move;
        }
    }

    return `${bestMove.from}${bestMove.to}`;
}

module.exports = {
    findBestMove
};
