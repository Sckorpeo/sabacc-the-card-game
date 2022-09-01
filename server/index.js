const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// static middleware
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

io.on('connection', (socket) => {
    console.log('a user connected.');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try {
        console.log(`listening on port ${port}`);
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = app;
