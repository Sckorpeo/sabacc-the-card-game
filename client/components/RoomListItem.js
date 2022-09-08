import React from 'react';
import '../styles/RoomListItem.css';

const RoomListItem = ({ username, players }) => {
    return (
        <div className="RoomListItem">
            <div className="RoomListItem-username">{username}</div>
            <div className="RoomListItem-players">{players.length}/8</div>
            <button>Join Room</button>
        </div>
    );
};

export default RoomListItem;
