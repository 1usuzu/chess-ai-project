import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const game = new Chess();

function GameScreen({ mode, playerColor, goHome }) {
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const onDrop = (source, target) => {
    if (game.isGameOver()) return false;

    const moves = game.moves({ verbose: true });
    const isPromotion = moves.some(m => m.from === source && m.to === target && m.promotion);

    const move = game.move({
      from: source,
      to: target,
      promotion: isPromotion ? 'q' : undefined
    });

    if (!move) return false;

    setFen(game.fen());
    setHistory([...game.history()]);
    checkGameOver();

    if (mode === "pve") {
      setTimeout(makeAIMove, 500);
    }

    return true;
  };

  const makeAIMove = () => {
    const moves = game.moves();
    if (moves.length === 0) return;
    const random = moves[Math.floor(Math.random() * moves.length)];
    game.move(random);
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
    <div style={styles.container}>
      <h2 style={styles.title}>
        {mode === "pvp" ? "🧑‍🤝‍🧑 Người vs Người" : "👤🤖 Người vs AI"}
      </h2>

      <div style={styles.gameArea}>
        <div>
          <Chessboard
            position={fen}
            onPieceDrop={onDrop}
            boardOrientation={playerColor}
            boardWidth={450}
            isDraggablePiece={({ piece }) => {
              const isWhite = piece[0] === 'w';
              return (playerColor === 'white' && isWhite && game.turn() === 'w') ||
                     (playerColor === 'black' && !isWhite && game.turn() === 'b');
            }}
          />
        </div>

        <div style={styles.history}>
          <h4>Lịch sử</h4>
          <ol>{history.map((m, i) => <li key={i}>{m}</li>)}</ol>
        </div>
      </div>

      <div style={styles.controls}>
        <button onClick={resetGame}>🔁 Chơi lại</button>
        <button onClick={goHome}>🏠 Trang Chủ</button>
      </div>

      {gameOver && (
        <div style={styles.popup}>
          <h2>{winner}</h2>
          <button onClick={resetGame}>Chơi lại</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '1rem',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem'
  },
gameArea: {
    display: 'grid',
    gridTemplateColumns: 'auto 200px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
  },
  history: {
    background: '#fff',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    minWidth: '160px',
    maxHeight: '450px',
    overflowY: 'auto',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  controls: {
    marginTop: '1.5rem',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#ffecec',
    border: '2px solid #ff9999',
    borderRadius: '10px',
    padding: '1rem 2rem',
    zIndex: 1000,
  }
};

export default GameScreen;