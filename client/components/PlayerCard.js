import React from 'react';
import '../styles/PlayerCard.css';

const PlayerCard = ({
    username,
    turn = false,
    gameStarted = false,
    handTotal = 0,
    youAreThePlayer = false,
}) => {
    return (
        <div className="PlayerCard">
            <div className="PlayerCard-content">
                <div className="PlayerCard-username">{username}</div>
                {turn && <i className="far fa-compass fa-spin fa-3x"></i>}
            </div>
            {gameStarted && youAreThePlayer && <p>Hand Total: {handTotal}</p>}
        </div>
    );
};

export default PlayerCard;
