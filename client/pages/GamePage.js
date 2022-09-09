import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRoom } from '../store/reducer/roomsReducer';
import { useParams } from 'react-router-dom';
import '../styles/GamePage.css';

import PlayerCard from '../components/PlayerCard';
import CardHolder from '../components/CardHolder';
import DeckHolder from '../components/DeckHolder';

import { initGame } from '../utils/gameFunctions';

const GamePage = () => {
    const dispatch = useDispatch();
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.rooms);
    const game = rooms.find((item) => item.roomId === roomId) || {};

    useEffect(() => {
        const player = {
            hand: [],
            handTotal: 0,
            socketId: window.socket.id,
            username: window.localStorage.getItem('username'),
        };
        window.socket.emit('roomJoin', roomId, player);

        window.socket.on('gameUpdate', (game) => {
            dispatch(updateRoom(game));
        });
    }, []);

    const handleStart = () => {
        const gameCopy = JSON.parse(JSON.stringify(game));
        window.socket.emit('gameUpdate', initGame(gameCopy));
    };

    if (!Object.keys(game).length) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="GamePage">
                <PlayerCard
                    turn={window.socket.id === game.curPlayer}
                    username={window.localStorage.getItem('username')}
                    key={window.localStorage.getItem('username')}
                    gameStarted={game.gameStarted}
                    handTotal={
                        game.players.find(
                            (player) => player.socketId === window.socket.id
                        )?.handTotal
                    }
                    youAreThePlayer={true}
                />
                {game.players.map(
                    (player) =>
                        player.socketId !== window.socket.id && (
                            <PlayerCard
                                turn={game.curPlayer === player.socketId}
                                username={player.username}
                                key={player.username}
                                gameStarted={game.gameStarted}
                            />
                        )
                )}
                <div>
                    <DeckHolder />
                    <CardHolder />
                </div>
                {game.host.socketId === window.socket.id && !game.gameStarted && (
                    <button
                        disabled={game.players.length < 2}
                        onClick={handleStart}
                    >
                        Start Game
                    </button>
                )}
                {game.curPlayer === window.socket.id && (
                    <button>Skip Turn</button>
                )}
            </div>
        );
    }
};

export default GamePage;
