import React from 'react';
import '../styles/Card.css';

import { discardAndDraw } from '../utils/gameFunctions';

const Card = ({ card, cardBack = false, playerTurn = false, game, action }) => {
    const handleClick = () => {
        if (playerTurn && action === 'DECK') {
            const gameCopy = JSON.parse(JSON.stringify(game));
            window.socket.emit('gameUpdate', discardAndDraw(gameCopy, card));
        }
    };

    if (cardBack) {
        return <img className="Card" src={`public/assets/logo.png`} />;
    } else if (card?.imgNum === '0') {
        return (
            <img
                className="Card"
                src={'public/assets/sabacc_sylop_thumb.png'}
                onClick={handleClick}
            />
        );
    } else {
        return (
            <img
                className="Card"
                src={`public/assets/sabacc_${card?.sign}_${card?.suit}_${card?.imgNum}_thumb.png`}
                onClick={handleClick}
            />
        );
    }
};

export default Card;
