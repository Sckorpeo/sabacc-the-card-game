import React from 'react';
import '../styles/DeckHolder.css';
import Card from './Card';

const DeckHolder = ({ deck = [], discard = [] }) => {
    return (
        <div className="DeckHolder">
            <Card cardBack={true} />
            <Card
                sign={discard[0]?.sign}
                suit={discard[0]?.suit}
                number={discard[0]?.number}
            />
        </div>
    );
};

export default DeckHolder;
