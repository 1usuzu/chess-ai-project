import React, { useState } from 'react';
import { Chess } from 'chess.js';
import Board from '../components/Board';
import MoveHistory from '../components/MoveHistory';
import GameOverPopup from '../components/GameOverPopup';

function GameScreen({ mode, playerColor, goHome }) {
  const game = new Chess();
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const onDrop = (source, target) => {
    if (game.isGameOver()) return false;

    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (!move) return false;

    setFen(game.fen());
    setHistory([...game.history()]);
    checkGameOver();

    if (mode === "pve") {
      setTimeout(makeAIMove, 300);
    }

    return true;
  };

  const makeAIMove = () => {
    const moves = game.moves();
    if (moves.length === 0) return;
    game.move(moves[Math.floor(Math.random() * moves.length)]);
    setFen(game.fen());
    setHistory([...game.history()]);
    checkGameOver();
  };

  const checkGameOver = () => {
    if (game.isCheckmate()) {
      setGameOver(true);
      setWinner(game.turn() === 'w' ? "Đen thắng!" : "Trắng thắng!");
    } else if (game.isDraw()) {
      setGameOver(true);
      setWinner("Hòa cờ!");
    }
  };

  const resetGame = () => {
    game.reset();
    setFen(game.fen());
    setHistory([]);
    setGameOver(false);
    setWinner("");
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        {mode === 'pvp' ? '👥 Người vs Người' : '🤖 Người vs AI'}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 200px',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '2rem',
        paddingTop: '1rem'
      }}>
        <Board fen={fen} onDrop={onDrop} playerColor={playerColor} />
        <MoveHistory history={history} />
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={resetGame}>🔁 Chơi lại</button>
        <button onClick={goHome}>🏠 Trang Chủ</button>
      </div>

      {gameOver && <GameOverPopup winner={winner} onRetry={resetGame} />}
    </div>
  );
}

export default GameScreen;