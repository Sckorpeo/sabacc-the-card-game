const onlineUsers = require('./onlineUsers');
let rooms = require('./rooms');

const handleUserJoin = (username, socket) => {
    onlineUsers[socket.id] = username;
    socket.broadcast.emit('onlineUsers', onlineUsers);
};

const handleRoomCreate = (socket) => {
    socket.broadcast.emit('roomsUpdate', rooms);
};

module.exports = {
    handleUserJoin,
    handleRoomCreate,
};
