import React, { useState } from 'react';
import { Chess } from 'chess.js';
import Board from '../components/Board';
import MoveHistory from '../components/MoveHistory';
import GameOverPopup from '../components/GameOverPopup';
import InvalidMovePopup from '../components/InvalidMovePopup';

function GameScreen({ mode, playerColor, goHome }) {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [activeSquare, setActiveSquare] = useState(null);
  const [legalSquares, setLegalSquares] = useState([]);
  const [showInvalid, setShowInvalid] = useState(false);

  const updateGame = () => {
    setFen(game.fen());
    setHistory([...game.history()]);
    setActiveSquare(null);
    setLegalSquares([]);
    checkGameStatus();
  };

  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setGameOver(true);
      setWinner(game.turn() === 'w' ? 'Đen thắng!' : 'Trắng thắng!');
    } else if (game.isDraw()) {
      setGameOver(true);
      setWinner('Hòa cờ!');
    }
  };

  const onDrop = (source, target) => {
    let move = null;
    try {
      move = game.move({ from: source, to: target, promotion: 'q' });
    } catch (error) {
      console.error('Invalid move:', error);
      setShowInvalid(true);
      return false;
    }

    if (!move) {
      setShowInvalid(true);
      return false;
    }

    updateGame();

    if (mode === 'pve') {
      setTimeout(makeAIMove, 300);
    }

    return true;
  };

  const makeAIMove = () => {
    if (game.isGameOver()) return;
    const moves = game.moves();
    if (moves.length === 0) return;
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    game.move(randomMove);
    updateGame();
  };

  const resetGame = () => {
    game.reset();
    updateGame();
    setGameOver(false);
    setWinner('');
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        {mode === 'pvp' ? '👥 Người vs Người' : '🤖 Người vs AI'}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 200px',
          justifyContent: 'center',
          alignItems: 'start',
          gap: '2rem',
          paddingTop: '1rem',
        }}
      >
        <Board
          fen={fen}
          onDrop={onDrop}
          playerColor={playerColor}
          game={game}
          onInvalidMove={() => setShowInvalid(true)}
          activeSquare={activeSquare}
          setActiveSquare={setActiveSquare}
          setLegalSquares={setLegalSquares}
        />
        <MoveHistory history={history} />
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
<button onClick={resetGame}>🔁 Chơi lại</button>
        <button onClick={goHome}>🏠 Trang Chủ</button>
      </div>

      {gameOver && <GameOverPopup winner={winner} onRetry={resetGame} />}
      {showInvalid && <InvalidMovePopup onClose={() => setShowInvalid(false)} />}
    </div>
  );
}

export default GameScreen;