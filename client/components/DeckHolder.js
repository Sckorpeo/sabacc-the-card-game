import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/DeckHolder.css';
import Card from './Card';

const DeckHolder = ({ handleClick }) => {
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.rooms);
    const game = rooms.find((item) => item.roomId === roomId);
    if (!game) {
        return <div>Loading..</div>;
    }
    return (
        <div className="DeckHolder">
            <div
                onClick={() => {
                    handleClick('DECK');
                }}
            >
                {game.gameStarted && <Card cardBack={true} />}
            </div>
            <div
                onClick={() => {
                    handleClick('DISCARD');
                }}
            >
                {game.gameStarted && <Card card={game?.discard[0]} />}
            </div>
        </div>
    );
};

export default DeckHolder;
