const router = require('express').Router();
let rooms = require('../logic/rooms');

router.get('/', (req, res, next) => {
    try {
        res.send(rooms);
    } catch (ex) {
        next(ex);
    }
});

router.post('/', (req, res, next) => {
    try {
        rooms.push(req.body.room);
        req.body.socket.emit();
        res.sendStatus(201);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
