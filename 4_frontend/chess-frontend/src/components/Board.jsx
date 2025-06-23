import React from 'react';
import { Chessboard } from 'react-chessboard';
import styles from './Board.module.css';

function Board({ fen, onDrop, playerColor }) {
  return (
    <div className={styles.boardWrapper}>
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation={playerColor}
        boardWidth={450}
        isDraggablePiece={({ piece }) => {
          const isWhite = piece[0] === 'w';
          return (playerColor === 'white' && isWhite) ||
                 (playerColor === 'black' && !isWhite);
        }}
      />
    </div>
  );
}

export default Board;