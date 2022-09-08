import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/Lobby.css';
import RoomListItem from './RoomListItem';
import {
    fetchRooms,
    createRoom,
    setRooms,
} from '../store/reducer/roomsReducer';
import { generateRoomCode } from '../utils/roomCode';
import Room from '../models/room';
import Player from '../models/player';

const Lobby = () => {
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, []);

    useEffect(() => {
        window.socket.on('roomsUpdate', (rooms) => {
            dispatch(setRooms(rooms));
        });
    }, []);

    const handleClick = () => {
        const username = window.localStorage.getItem('username');
        const socketId = window.socket.id;
        const roomId = generateRoomCode();
        const newRoom = new Room(roomId, username, socketId);
        newRoom.addPlayer(new Player(username, socketId));
        dispatch(createRoom(newRoom));
    };
    return (
        <div className="Lobby">
            <div className="Lobby-room-list">
                {rooms.map((room) => (
                    <RoomListItem
                        username={room.host.username}
                        players={room.players}
                        key={room.roomId}
                    />
                ))}
            </div>
            <button onClick={handleClick}>Create Room</button>
        </div>
    );
};

export default Lobby;
