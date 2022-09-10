import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/CardHolder.css';
import Card from './Card';

const CardHolder = ({ hand = [], action }) => {
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.rooms);
    const game = rooms.find((item) => item.roomId === roomId);
    const playerHand = game.players.find(
        (player) => player.socketId === window.socket.id
    )?.hand;
    if (!game) {
        return <div>Loading..</div>;
    }
    return (
        <div className="CardHolder">
            {playerHand?.map((card) => (
                <Card
                    card={card}
                    action={action}
                    sign={card.sign}
                    suit={card.suit}
                    number={card.imgNum}
                    key={card.id}
                    playerTurn={game.curPlayer === window.socket.id}
                    game={game}
                />
            ))}
        </div>
    );
};

export default CardHolder;
