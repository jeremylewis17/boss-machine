const express = require('express');
const db = require('./db');
const minionsRouter = express.Router();

minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    if (minions) {
        res.send(minions);
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = db.getFromDatabaseById('minions', minionId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.query);
    if (newMinion){
        res.status(201).send(newMinion);
    } else {
        res.status(400).send();
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const updatedMinion = db.updateInstanceInDatabase('minions', minionId);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const deleted = db.deleteFromDatabasebyId('minions', minionId);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;