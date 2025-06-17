import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const game = new Chess();

function App() {
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [screen, setScreen] = useState("home"); // home, chooseColor, game
  const [mode, setMode] = useState("");         // pvp, pve
  const [playerColor, setPlayerColor] = useState("white");

  const onDrop = (sourceSquare, targetSquare) => {
    if (game.isGameOver()) return false;

    const moves = game.moves({ verbose: true });
    const isPromotion = moves.some(m =>
      m.from === sourceSquare &&
      m.to === targetSquare &&
      m.promotion
    );

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: isPromotion ? 'q' : undefined,
    });

    if (move === null) return false;

    setFen(game.fen());
    setHistory([...game.history()]);
    checkGameOver();
    return true;
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

  const startGame = (selectedMode) => {
    setMode(selectedMode);
    setScreen("chooseColor");
  };

  // === Trang chọn chế độ chơi ===
  if (screen === "home") {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>♟️ Cờ Vua AI</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Chọn chế độ chơi</p>

        <div style={styles.modeBoxWrapper}>
          <div style={styles.modeBox} onClick={() => startGame("pvp")}>
            <div style={styles.icon}>👤⚔️👤</div>
            <div style={styles.modeTitle}>Người vs Người</div>
          </div>

          <div style={styles.modeBox} onClick={() => startGame("pve")}>
            <div style={styles.icon}>👤🤖</div>
            <div style={styles.modeTitle}>Người vs AI</div>
          </div>
        </div>
      </div>
    );
  }

  // === Trang chọn quân cờ ===
  if (screen === "chooseColor") {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Chọn Quân Cờ</h2>
        <p style={{ fontSize: '1.1rem' }}>Bạn muốn chơi với quân:</p>

        <div style={styles.modeBoxWrapper}>
          <div
            style={styles.modeBox}
            onClick={() => {
              setPlayerColor('white');
              setScreen('game');
              resetGame();
            }}
          >
            <div style={styles.icon}>⚪</div>
            <div style={styles.modeTitle}>Trắng (đi trước)</div>
          </div>

          <div
            style={styles.modeBox}
            onClick={() => {
              setPlayerColor('black');
              setScreen('game');
              resetGame();
            }}
          >
            <div style={styles.icon}>⚫</div>
            <div style={styles.modeTitle}>Đen (đi sau)</div>
          </div>
        </div>
      </div>
    );
  }

  // === Giao diện chơi cờ ===
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {mode === "pvp" ? "👥 Người vs Người" : "🤖 Người vs AI"}
      </h1>

      <div style={styles.boardWrapper}>
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardOrientation={playerColor}
          boardWidth={Math.min(window.innerWidth * 0.9, 450)}
        />

        <div style={styles.historyPanel}>
          <h3>Lịch sử nước đi</h3>
          <ol>
            {history.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ol>
        </div>
      </div>

      <div style={styles.controls}>
        <button onClick={resetGame} style={styles.button}>🔁 Chơi lại</button>
        <button onClick={() => setScreen("home")} style={styles.button}>🏠 Về Trang Chủ</button>
      </div>

      {gameOver && (
        <div style={styles.popup}>
          <h2>{winner}</h2>
          <button onClick={resetGame} style={styles.button}>Chơi lại</button>
        </div>
      )}
    </div>
  );
}

// === STYLE ===
const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    padding: '1rem',
    background: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: '1rem',
    color: '#333',
  },
  boardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  historyPanel: {
    textAlign: 'left',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    maxHeight: '300px',
    overflowY: 'auto',
    minWidth: '150px',
  },
  controls: {
    marginTop: '1.5rem',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #aaa',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
  },
  popup: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#ffe8e8',
    border: '1px solid #ff9999',
    borderRadius: '10px',
    display: 'inline-block',
  },
  modeBoxWrapper: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modeBox: {
    width: '180px',
    height: '180px',
    background: '#fff',
    border: '2px solid #ccc',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '1rem',
  },
  modeTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
  },
};

export default App;
