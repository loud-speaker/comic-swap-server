const router = require('express').Router();
const Catalog = require('../models/catalog');
const { respond } = require('./route-helpers');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router

    .get('/', (req, res, next) => {
        Catalog.find({})
            .lean()
            .then(catalogs => res.json(catalogs))
            .catch(next);
    })

    .get('/:userId', (req, res, next) => {
        console.log('\n\n\n USER ID \n', req.user);
        Catalog.find({ userId: req.user.id })
            .lean()
            .then(catalog => res.json(catalog))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        Catalog.create(req.body)
            .then(catalog => res.json(catalog))
            .catch(next);
    })
    
    .put('/:id', respond(
        ({ body }) => Catalog.findByIdAndUpdate(body._id, body, updateOptions)
    ));


