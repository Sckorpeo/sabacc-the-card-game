import React from 'react';
import '../styles/CardHolder.css';
import Card from './Card';

const CardHolder = ({ hand = [] }) => {
    return (
        <div className="CardHolder">
            {hand.map((card) => (
                <Card sign={card.sign} suit={card.suit} number={card.number} />
            ))}
        </div>
    );
};

export default CardHolder;
