import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoomListItem.css';

const RoomListItem = ({ username, players, room }) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/game/${room.roomId}`);
    };
    return (
        <div className="RoomListItem">
            <div className="RoomListItem-username">{username}</div>
            <div className="RoomListItem-players">{players.length}/8</div>
            <button onClick={handleClick}>Join Room</button>
        </div>
    );
};

export default RoomListItem;
