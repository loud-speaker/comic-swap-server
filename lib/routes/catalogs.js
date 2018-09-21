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

    .get('/:userId/matches', (req, res, next) => {
        Catalog.getWishlist(req.user.id)
            .then(wishlist => {
                let desiredComicIds = wishlist.map(catalog => catalog.comic);
                Catalog.find({ exchange: 'Trade', user: { $ne: req.user.id }, comic: { $in: desiredComicIds } })
                    .lean()
                    .populate({
                        path: 'user',
                        select: 'avatar username email zip'
                    })
                    .populate({
                        path: 'comic',
                        select: 'issueName volumeName coverDate image'
                    })
                    .then(matches => {
                        res.json(matches);
                    })
                    .catch(next);
            });
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
