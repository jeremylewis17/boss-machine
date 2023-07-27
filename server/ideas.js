const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const db = require('./db');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaId = id;
    const validId = db.getFromDatabaseById('ideas', ideaId);
    if (validId){
        req.ideaId = ideaId;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    if (ideas) {
        res.send(ideas);
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
        res.send(db.getFromDatabaseById('ideas', req.ideaId));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    if (newIdea){
        res.status(201).send(newIdea);
    } else {
        res.status(400).send();
    }
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('ideas', req.ideaId);
    res.status(204).send();
});



module.exports = ideasRouter;