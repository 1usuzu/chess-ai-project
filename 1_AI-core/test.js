const { Chess } = require("chess.js");
const { findBestMove } = require("./chess-ai");

const game = new Chess(); // Bắt đầu với bàn cờ ban đầu

console.log("Bàn cờ hiện tại:");
console.log(game.ascii());

// Tìm nước đi tốt nhất
const bestMoveNotation = findBestMove(game.fen(), 3);

// Thực hiện nước đi để lấy from và to
const moveObj = game.move(bestMoveNotation, { sloppy: true });

console.log(`\nNước đi tốt nhất: ${moveObj.from} → ${moveObj.to}`);
console.log("\nBàn cờ sau khi đi nước đó:");
console.log(game.ascii());
