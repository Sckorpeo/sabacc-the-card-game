const express = require('express');
const path = require('path');

const server = express();

// static middleware
server.use('/public', express.static(path.join(__dirname, '..', 'public')));
server.use(express.json());

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;

server.listen(port, async () => {
    try {
        console.log(`listening on port ${port}`);
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = server;
