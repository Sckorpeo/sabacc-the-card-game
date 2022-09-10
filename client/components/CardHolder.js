import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/CardHolder.css';
import Card from './Card';

const CardHolder = ({ hand = null, action, clearAction }) => {
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.rooms);
    const game = rooms.find((item) => item.roomId === roomId);
    const playerHand =
        hand ||
        game.players.find((player) => player.socketId === window.socket.id)
            ?.hand;
    if (!game) {
        return <div>Loading..</div>;
    }
    return (
        <div className="CardHolder">
            {playerHand?.map((card) => (
                <Card
                    card={card}
                    action={action}
                    key={card.id}
                    playerTurn={game.curPlayer === window.socket.id}
                    game={game}
                    clearAction={clearAction}
                />
            ))}
        </div>
    );
};

export default CardHolder;
