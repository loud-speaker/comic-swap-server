const router = require('express').Router();
const Comic = require('../models/Comic');
const { returnComicList, returnComicDetail } = require('../utils/comic-middleware');
// const { respond } = require('./route-helpers');

module.exports = router

    .post('/', (req, res, next) => {
        console.log('REQUEST.body', req.body);
        Comic.create(req.body)
            .then(comic => {
                console.log('COMIC', comic);
                res.json(comic);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Comic.find()
            .lean()
            .then(comics => res.json(comics))
            .catch(next);
    })

    .get('/comic-search', returnComicList(), (req, res) => {
        return res.json(req.body);
    })

    .get('/comic-detail', returnComicDetail(), (req, res) => {
        return res.json(req.body);
    });