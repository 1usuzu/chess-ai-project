import React from 'react';
import styles from './GameOverPopup.module.css';

function GameOverPopup({ winner, onRetry }) {
  return (
    <div className={styles.popup}>
      <h2>{winner}</h2>
      <button onClick={onRetry}>Chơi lại</button>
    </div>
  );
}

export default GameOverPopup;