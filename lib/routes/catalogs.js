const router = require('express').Router();
const Catalog = require('../models/catalog');
// add comics
// update comic condition
// get all for trade??

module.exports = router

    .post('/', (req, res, next) => {
        Catalog.create(req.body)
            .then(catalog => res.json(catalog))
            .catch(next);
    });