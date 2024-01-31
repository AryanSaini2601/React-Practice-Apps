import React from 'react';
import './Cell.css';

const Cell = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />

        <img
          className="back"
          src="https://w0.peakpx.com/wallpaper/495/863/HD-wallpaper-random-awesome-blue-games-nerds-red.jpg"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Cell;
