import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRoom } from '../store/reducer/roomsReducer';
import { useParams } from 'react-router-dom';
import '../styles/GamePage.css';

import PlayerCard from '../components/PlayerCard';
import CardHolder from '../components/CardHolder';
import DeckHolder from '../components/DeckHolder';
import Audio from '../components/Audio';

import { initGame, skipTurn } from '../utils/gameFunctions';

const GamePage = () => {
    const [action, setAction] = useState('');
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
    }, []);

    const handleStart = () => {
        const gameCopy = JSON.parse(JSON.stringify(game));
        window.socket.emit('gameUpdate', initGame(gameCopy));
    };

    const handleSkip = () => {
        const gameCopy = JSON.parse(JSON.stringify(game));
        window.socket.emit('gameUpdate', skipTurn(gameCopy));
    };

    const handleClick = (word) => {
        if (!game.gameStarted) {
            return null;
        } else if (game.curPlayer !== window.socket.id) {
            window.alert(
                'Please wait for current player to finish their turn.'
            );
            return null;
        }
        switch (word) {
            case 'DECK':
                window.alert('Choose a card from your hand to discard');
                return setAction('DECK');
            case 'DISCARD':
                window.alert('Choose a card from your hand to trade');
                return setAction('DISCARD');
            default:
                return setAction('');
        }
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
                                gameEnded={game.gameOver}
                                handTotal={player.handTotal}
                            />
                        )
                )}
                <div>
                    <DeckHolder handleClick={handleClick} />
                    <CardHolder
                        action={action}
                        clearAction={() => setAction('')}
                    />
                </div>
                <Audio url={'public/assets/3._ilikethisroo'} />
                {game.host.socketId === window.socket.id && !game.gameStarted && (
                    <button
                        disabled={game.players.length < 2}
                        onClick={handleStart}
                    >
                        Start Game
                    </button>
                )}
                {game.curPlayer === window.socket.id && (
                    <button onClick={handleSkip}>Skip Turn</button>
                )}
                {game.host.socketId === window.socket.id &&
                    game.gameStarted &&
                    game.gameOver && (
                        <button onClick={handleStart}>Reset</button>
                    )}
            </div>
        );
    }
};

export default GamePage;
