const express = require('express');
const db = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
    } else {
        res.status(404).send();
    }
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;