const router = require('express').Router();
const Comic = require('../models/Comic');
const Catalog = require('../models/catalog');
const { returnComicList, returnComicDetail } = require('../utils/comic-middleware');
// const { respond } = require('./route-helpers');

module.exports = router

    .post('/', (req, res, next) => {
        Comic.exists(req.body._id)
            .then(exists => {
                if(exists) {
                    let catalog = { userId: req.body.user, comicId: req.body._id, condition: 'Unknown' };
                    return Catalog.create(catalog)
                        .then(data => {
                            res.json(data);
                        });
                } else {
                    Comic.create(req.body)
                        .then(comic => {
                            let catalog = { userId: req.body.user, comicId: comic._id, condition: 'Unknown' };
                            return Catalog.create(catalog)
                                .then(data => {
                                    console.log(data);
                                    res.json(data);
                                });
                        });
                }
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