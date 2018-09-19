const router = require('express').Router();
const Catalog = require('../models/catalog');
const { respond } = require('./route-helpers');
// update comic condition
// get all for trade??

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router

    .post('/', (req, res, next) => {
        Catalog.create(req.body)
            .then(catalog => res.json(catalog))
            .catch(next);
    })
    
    .put('/:id', respond(
        ({ body }) => Catalog.findByIdAndUpdate(body._id, body, updateOptions)
    ));