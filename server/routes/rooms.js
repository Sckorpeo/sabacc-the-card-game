const router = require('express').Router();
let rooms = require('../logic/rooms');

router.get('/', (req, res, next) => {
    try {
        console.log(rooms);
        res.send(rooms);
    } catch (ex) {
        next(ex);
    }
});

router.post('/', (req, res, next) => {
    try {
        rooms.push(req.body);
        res.send(req.body);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
