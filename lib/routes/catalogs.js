const router = require('express').Router();
const Catalog = require('../models/catalog');
// const { respond } = require('./route-helpers');

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
        Catalog.find({ user: req.user.id })
            .lean()
            .populate({
                path: 'comic'
            })
            .then(catalog => res.json(catalog))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        Catalog.create(req.body)
            .then(catalog => res.json(catalog))
            .catch(next);
    })

    
    .put('/:id', (req, res, next) => {
        Catalog.findByIdAndUpdate(
            req.params.id,
            req.body,
            updateOptions
        )
            .then(catalog => res.json(catalog))
            .catch(next);
    })
        
    .delete('/:id', (req, res, next) => {
        Catalog.findByIdAndRemove(req.params.id)
            .then(catalog => res.json({ removed: !!catalog }))
            .catch(next);
    });
