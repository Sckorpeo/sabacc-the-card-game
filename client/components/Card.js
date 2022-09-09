import React from 'react';
import '../styles/Card.css';

const Card = ({ sign, suit, number, cardBack = false }) => {
    if (cardBack) {
        return <img className="Card" src={`public/assets/logo.png`} />;
    } else if (number === '0') {
        return (
            <img
                className="Card"
                src={'public/assets/sabacc_sylop_thumb.png'}
            />
        );
    } else {
        return (
            <img
                className="Card"
                src={`public/assets/sabacc_${sign}_${suit}_${number}_thumb.png`}
            />
        );
    }
};

export default Card;
