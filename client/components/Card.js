import React from 'react';
import '../styles/Card.css';

const Card = ({ sign, suit, number, cardBack = false }) => {
    if (cardBack) {
        return <img className="Card" src={`public/assets/logo.png`} />;
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
