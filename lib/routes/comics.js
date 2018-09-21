const router = require('express').Router();
const Comic = require('../models/comic');
const Catalog = require('../models/catalog');
const { returnComicList, returnComicDetail } = require('../utils/comic-middleware');
// const { respond } = require('./route-helpers');

module.exports = router

    .post('/', (req, res, next) => {
        Comic.exists({ comicId: req.body.comicId })
            .then(exists => {
                if(exists) {
                    return Comic.findOne({ comicId: req.body.comicId })
                        .then(comic => {
                            let catalog = { user: req.body.user, comic: comic._id, condition: 'Good', exchange: 'Own' };
                            return Catalog.create(catalog)
                                .then(data => {
                                    res.json(data);
                                });
                        });
                } else {
                    Comic.create(req.body)
                        .then(comic => {
                            let catalog = { user: req.body.user, comic: comic._id, condition: 'Good', exchange: 'Own' };
                            return Catalog.create(catalog)
                                .then(data => {
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