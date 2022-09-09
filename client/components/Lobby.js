// Packages
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Components and Styles
import '../styles/Lobby.css';
import RoomListItem from './RoomListItem';

//State
import {
    fetchRooms,
    createRoom,
    setRooms,
} from '../store/reducer/roomsReducer';

// Util Functions
import { generateRoomCode } from '../utils/roomCode';

// Classes
import Room from '../models/room';

const Lobby = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, []);
    const handleClick = () => {
        const username = window.localStorage.getItem('username');
        const socketId = window.socket.id;
        const roomId = generateRoomCode();
        const newRoom = new Room(roomId, username, socketId);
        window.socket.emit('roomCreated', newRoom);
        navigate(`/game/${newRoom.roomId}`);
    };
    return (
        <div className="Lobby">
            <div className="Lobby-room-list">
                {rooms.map(
                    (room) =>
                        !room.gameStarted && (
                            <RoomListItem
                                username={room.host.username}
                                players={room.players}
                                key={room.roomId}
                                room={room}
                            />
                        )
                )}
            </div>
            <button onClick={handleClick}>Create Room</button>
        </div>
    );
};

export default Lobby;
