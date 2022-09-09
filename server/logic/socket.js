const onlineUsers = require('./onlineUsers');
let rooms = require('./rooms');

const handleUserJoin = (username, socket) => {
    onlineUsers[socket.id] = username;
    socket.broadcast.emit('onlineUsers', onlineUsers);
};

const handleRoomCreate = (io, room) => {
    rooms.push(room);
    io.emit('roomsUpdate', rooms);
};

const handleRoomJoin = (roomId, player, socket) => {
    try {
        const roomToUpdate = rooms.find((room) => room.roomId === roomId);
        roomToUpdate.players = [...roomToUpdate.players, player];
        rooms = [
            ...rooms.map((room) =>
                room.roomId === roomId ? roomToUpdate : room
            ),
        ];
        socket.emit('roomsUpdate', rooms);
    } catch (ex) {
        console.log(ex);
    }
};

module.exports = {
    handleUserJoin,
    handleRoomCreate,
    handleRoomJoin,
};
