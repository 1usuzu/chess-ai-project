const { Chess } = require("chess.js");
const { findBestMove } = require("./chess-ai");
const prompt = require("prompt-sync")();

let playerColor = prompt("Bạn muốn chơi quân nào? (w = Trắng, b = Đen): ").trim().toLowerCase();
while (playerColor !== 'w' && playerColor !== 'b') {
    playerColor = prompt("Vui lòng nhập lại (w hoặc b): ").trim().toLowerCase();
}
const aiColor = playerColor === 'w' ? 'b' : 'w';

const game = new Chess();

function printBoard() {
    console.log("\nBàn cờ hiện tại:");
    console.log(game.ascii());
    console.log("Lượt đi hiện tại:", game.turn() === 'w' ? "Trắng" : "Đen");
}

function checkGameOver() {
    if (game.isGameOver()) {
        if (game.isCheckmate()) {
            console.log("Chiếu hết!");
        } else if (game.isDraw()) {
            console.log("Ván đấu hòa!");
        } else {
            console.log("Ván đấu kết thúc!");
        }
        printBoard();
        process.exit(0);
    }
}

printBoard();

// ----- VÒNG LẶP TRÒ CHƠI -----
while (true) {
    if (game.turn() === playerColor) {
        const moveInput = prompt("Nhập nước đi của bạn (ví dụ: e2e4): ").trim();
        const move = game.move(moveInput, { sloppy: true });

        if (!move) {
            console.log(" Nước đi không hợp lệ, thử lại.");
            continue;
        }

        console.log(`\n Bạn (${playerColor === 'w' ? 'Trắng' : 'Đen'}) đi: ${move.from} → ${move.to}`);
        printBoard();
        checkGameOver();
    } else {
        const result = findBestMove(game.fen(), 3);

        console.log("\n Điểm từng nước đi AI có thể chọn:");
        result.scores.forEach(({ move, score }) => {
            console.log(`- ${move}: ${score}`);
        });

        const move = game.move(result.bestMove, { sloppy: true });
        console.log(`\n AI (${aiColor === 'w' ? 'Trắng' : 'Đen'}) đi: ${move.from} → ${move.to}`);
        printBoard();
        checkGameOver();
    }
}
