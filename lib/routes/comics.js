const router = require('express').Router();
const Comic = require('../models/Comic');
// const { respond } = require('./route-helpers');

module.exports = router

    .post('/', (req, res, next) => {
        Comic.create(req.body)
            .then(comic => res.json(comic))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Comic.find()
            .lean()
            .then(comics => res.json(comics))
            .catch(next);
    });