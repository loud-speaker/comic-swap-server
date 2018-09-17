const router = require('express').Router();
const { respond } = require('./route-helpers');
const User = require('../models/user');
// const createEnsureAuth = require('../auth/ensure-auth');
const { sign } = require('../auth/token-service');

function hasEmailandPassword(req, res, next) {
    const user = req.body;
    if(!user || !user.email || !user.password) {
        return next({
            code: 400,
            error: 'email and password must be supplied'
        });
    }
    next();
}

module.exports = router

    .post('/signup', hasEmailandPassword, respond(
        ({ body }) => {
            const { email, password } = body;
            delete body.password;

            return User.exists({ email })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'email in use'
                        };
                    }

                    const user = new User(body);
                    user.generateHash(password);
                    return user.save();
                })
                .then(user => {
                    return { token: sign(user) };
                });
        }
    ));