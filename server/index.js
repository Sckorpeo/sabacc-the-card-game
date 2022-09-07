const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const { Server } = require('socket.io');

const onlineUsers = require('./logic/onlineUsers');
const { handleUserJoin } = require('./logic/socket');

// static middleware
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
    try {
        console.log(`listening on port ${port}`);
    } catch (ex) {
        console.log(ex);
    }
});
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected.');
    socket.on('user-joined', (player) => {
        handleUserJoin(player, socket);
        socket.emit('onlineUsers', onlineUsers);
    });
    socket.on('message', (msg, username) => {
        socket.broadcast.emit('messageRec', { username, message: msg });
        console.log(`Got msg from ${username}: ${msg}`);
    });
    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
        socket.broadcast.emit('onlineUsers', onlineUsers);
        console.log('user disconnected');
    });
});

module.exports = app;
