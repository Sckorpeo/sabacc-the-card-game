import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GamePage.css';

import PlayerCard from '../components/PlayerCard';
import CardHolder from '../components/CardHolder';
import DeckHolder from '../components/DeckHolder';

const players = [];

const GamePage = ({ game = {} }) => {
    const { roomId } = useParams();
    const handleClick = (ev) => {
        console.log(roomId);
    };
    return (
        <div className="GamePage" onClick={handleClick}>
            <PlayerCard username={window.localStorage.getItem('username')} />
            {players.map(
                (player) =>
                    player.socketId !== window.socket.id && (
                        <PlayerCard username={player.username} />
                    )
            )}
            <div>
                <DeckHolder />
                <CardHolder />
            </div>
            <button disabled={players.length < 2}>Start Game</button>
            {game.curPlayer === window.socket.id && <button>Skip Turn</button>}
        </div>
    );
};

export default GamePage;
