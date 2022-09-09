import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/DeckHolder.css';
import Card from './Card';

const DeckHolder = () => {
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.rooms);
    const game = rooms.find((item) => item.roomId === roomId);
    if (!game) {
        return <div>Loading..</div>;
    }
    return (
        <div className="DeckHolder">
            <Card cardBack={true} />
            <Card
                sign={game.discard[0]?.sign}
                suit={game.discard[0]?.suit}
                number={game.discard[0]?.imgNum}
            />
        </div>
    );
};

export default DeckHolder;
