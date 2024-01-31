import React from 'react';
import './Cell.css';

const Cell = ({ filled, onClick, isDisabled, label }) => {
  return <button 
            type="button" 
            aria-label={label}
            onClick={onClick} 
            disabled = {isDisabled}
            className={filled ? 'cell cell-activated' : 'cell'}/>;
};

export default Cell;
