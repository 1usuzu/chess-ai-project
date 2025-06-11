import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';

function App() {
  const [gamePosition, setGamePosition] = useState('start');

  const onDrop = (sourceSquare, targetSquare) => {
    console.log(`Bạn đi: ${sourceSquare} → ${targetSquare}`);
    // TODO: Gửi nước đi lên server
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #ece9e6, #ffffff)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h1 style={{ marginBottom: '1rem', color: '#333' }}>♟️ Cờ Vua AI</h1>

      {/* Khung bàn cờ */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '95vw'
      }}>
        <Chessboard
          position={gamePosition}
          onPieceDrop={onDrop}
          boardWidth={Math.min(window.innerWidth * 0.9, 450)}
        />
      </div>

      {/* Thanh trạng thái / người chơi */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 450,
        fontSize: '1rem',
        color: '#555'
      }}>
        <span>👤 Bạn (Trắng)</span>
        <span>🤖 AI (Đen)</span>
      </div>

      {/* Nút chức năng */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button style={buttonStyle}>🔄 Chơi lại</button>
        <button style={buttonStyle}>💡 Gợi ý</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #aaa',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  transition: 'all 0.3s',
};

export default App;
