import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/Lobby.css';
import RoomListItem from './RoomListItem';
import { fetchRooms } from '../store/reducer/roomsReducer';

const Lobby = () => {
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchRooms());
    }, []);
    return (
        <div className="Lobby">
            <div className="Lobby-room-list">
                {rooms.map((room) => (
                    <RoomListItem username={room.host} players={room.players} />
                ))}
            </div>
            <button>Create Room</button>
        </div>
    );
};

export default Lobby;
