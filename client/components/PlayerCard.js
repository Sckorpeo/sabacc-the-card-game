import React from 'react';
import '../styles/PlayerCard.css';

const PlayerCard = ({
    username,
    turn = false,
    player = false,
    handTotal = 0,
}) => {
    return (
        <div className="PlayerCard">
            <div className="PlayerCard-content">
                <div className="PlayerCard-username">{username}</div>
                {turn && <i class="far fa-compass fa-spin fa-3x"></i>}
            </div>
            {player && <p>Hand Total: {handTotal}</p>}
        </div>
    );
};

export default PlayerCard;
