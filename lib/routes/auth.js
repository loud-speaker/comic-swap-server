const router = require('express').Router();
const { respond } = require('./route-helpers');
const User = require('../models/user');
const createEnsureAuth = require('../auth/ensure-auth');
const { sign } = require('../auth/token-service');

function hasEmailandPassword(req, res, next) {
    const user = req.body;
    if(!user || !user.email || !user.password) {
        return next({
            code: 400,
            error: 'Email and password are required'
        });
    }
    next();
}

module.exports = router

    .get('/verify', createEnsureAuth(), respond(
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasEmailandPassword, respond(
        ({ body }) => {
            const { email, password } = body;
            delete body.password;
            return User.exists({ email })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'Email already in use'
                        };
                    }

                    const user = new User(body);
                    user.generateHash(password);
                    return user.save();
                })
                .then(user => {
                    return { 
                        token: sign(user), 
                        // _id: user._id,
                        avatar: user.avatar,
                        zip: user.zip,
                        email: user.email,
                        username: user.username
                    };
                });
        }
    ))
    
    .post('/signin', hasEmailandPassword, respond(
        ({ body }) => {
            const { email, password } = body;
            delete body.password;

            return User.findOne({ email })
                .then(user => {
                    if(!user || !user.comparePassword(password)) {
                        throw {
                            status: 401,
                            error: 'Invalid email or password'
                        };
                    }

                    return {
                        token: sign(user),
                        // _id: user._id,
                        avatar: user.avatar,
                        zip: user.zip,
                        email: user.email,
                        username: user.username
                    };
                });
        }
    ));