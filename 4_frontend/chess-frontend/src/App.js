import React, { useState } from 'react';
import GameScreen from './GameScreen';

function App() {
  const [screen, setScreen] = useState("home"); // home | chooseColor | game
  const [mode, setMode] = useState("");
  const [playerColor, setPlayerColor] = useState("white");

  const handleStart = (selectedMode) => {
    setMode(selectedMode);
    setScreen("chooseColor");
  };

  if (screen === "home") {
    return (
      <div style={styles.container}>
        <h1>♟️ Cờ Vua AI</h1>
        <p>Chọn chế độ chơi:</p>
        <div style={styles.btnGroup}>
          <button onClick={() => handleStart("pvp")}>🧑‍🤝‍🧑 Người vs Người</button>
          <button onClick={() => handleStart("pve")}>👤🤖 Người vs AI</button>
        </div>
      </div>
    );
  }

  if (screen === "chooseColor") {
    return (
      <div style={styles.container}>
        <h2>Chọn Quân Cờ</h2>
        <div style={styles.btnGroup}>
          <button onClick={() => { setPlayerColor('white'); setScreen("game"); }}>
            ⚪ Trắng (đi trước)
          </button>
          <button onClick={() => { setPlayerColor('black'); setScreen("game"); }}>
            ⚫ Đen (đi sau)
          </button>
        </div>
        <button onClick={() => setScreen("home")}>⬅️ Quay lại</button>
      </div>
    );
  }

  return (
    <GameScreen
      mode={mode}
      playerColor={playerColor}
      goHome={() => setScreen("home")}
    />
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
  }
};

export default App;