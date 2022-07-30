import React from 'react';
import './history.css';

const GameCard = function(props) {

    
    return (
        <div className="game-card">
            <div>{props.game.id}</div>
            <div>{props.game.white.nick}</div>
            <div>{props.game.black.nick}</div>
            <div>{props.game.result}</div>
        </div>
    );
};

export default GameCard;