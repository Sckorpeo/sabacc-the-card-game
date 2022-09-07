const onlineUsers = require('./onlineUsers');

const handleUserJoin = (username, socket) => {
    onlineUsers[socket.id] = username;
    socket.broadcast.emit('onlineUsers', onlineUsers);
};

module.exports = {
    handleUserJoin,
};
