# Chess Game Logic

Module logic chính cho trò chơi cờ vua, bao gồm tất cả các quy tắc và tính năng cần thiết.

## Tính năng

- ✅ Tất cả quy tắc cờ vua cơ bản
- ✅ Nhập thành (Castling)
- ✅ Bắt tốt qua đường (En passant)
- ✅ Phong cấp tốt (Pawn promotion)
- ✅ Kiểm tra chiếu, chiếu bí, hết cờ
- ✅ Xử lý FEN notation
- ✅ Validation nước đi
- ✅ Quản lý trạng thái game

## Cấu trúc file

- `ChessGame.js` - Logic chính của trò chơi
- `FENParser.js` - Xử lý FEN notation
- `MoveValidator.js` - Validation các nước đi
- `GameState.js` - Quản lý trạng thái trò chơi
- `index.js` - Entry point và utilities

## Sử dụng

```javascript
import { createChessGame, ChessUtils } from './index.js';

// Tạo game mới
const game = createChessGame();

// Thực hiện nước đi
ChessUtils.makeMove(game, 'e2', 'e4');
ChessUtils.makeMove(game, 'e7', 'e5');

// Kiểm tra trạng thái
console.log(game.gameStatus); // 'playing', 'check', 'checkmate', etc.
console.log(game.currentPlayer); // 'white' or 'black'

// Lấy tất cả nước đi hợp lệ
const moves = ChessUtils.getAllValidMoves(game);
console.log(moves);
```

## API

### ChessGame
- `makeMove(fromRow, fromCol, toRow, toCol)` - Thực hiện nước đi
- `isValidMove(fromRow, fromCol, toRow, toCol)` - Kiểm tra nước đi hợp lệ
- `getValidMoves(row, col)` - Lấy các nước đi hợp lệ cho quân cờ
- `isKingInCheck(isWhite)` - Kiểm tra vua có bị chiếu không

### FENParser
- `fenToGameState(fenStr)` - Chuyển FEN thành trạng thái game
- `gameStateToFEN(gameState)` - Chuyển trạng thái game thành FEN
- `isValidFEN(fenStr)` - Kiểm tra FEN hợp lệ

### ChessUtils
- `algebraicToCoords(algebraic)` - Chuyển e4 thành [4,4]
- `coordsToAlgebraic(row, col)` - Chuyển [4,4] thành e4
- `makeMove(game, from, to)` - Thực hiện nước đi với notation
- `getAllValidMoves(game)` - Lấy tất cả nước đi hợp lệ