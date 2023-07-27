const express = require('express');
const db = require('./db');
const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
    const minionId = id;
    const validId = db.getFromDatabaseById('minions', minionId);
    if (validId){
        req.minionId = minionId;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    if (minions) {
        res.send(minions);
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
        res.send(db.getFromDatabaseById('minions', req.minionId));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    if (newMinion){
        res.status(201).send(newMinion);
    } else {
        res.status(400).send();
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('minions', req.minionId);
    res.status(204).send();
});

module.exports = minionsRouter;