const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

describe.only('Auth API', () => {

    beforeEach(() => dropCollection('users'));

    let token = null;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                avatar: 'riveter',
                username: 'mja23',
                email: 'me@me.com',
                password: 'abc123',
                zip: 97306
            })
            .then(({ body }) => {
                token = body.token;
            });
    });

    it('signup', () => {
        assert.ok(token);
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                console.log('body', body);
                assert.isOk(body.verified);
            });
    });

    it('signin', () => {
        return request
            .post('/api/auth/signin')
            .send({
                avatar: 'riveter',
                username: 'mja23',
                email: 'me@me.com',
                password: 'abc123',
                zip: 97306
            })
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });

    it('Gives 400 on signup of same email', () => {
        return request
            .post('/api/auth/signup')
            .send({
                avatar: 'riveter',
                username: 'mja23',
                email: 'me@me.com',
                password: 'abc123',
                zip: 97306
            })
            .then(res => {
                assert.equal(res.status, 400);
                assert.equal(res.body.error, 'email in use');
            });
    });

    it('gives 401 on non-existent email', () => {
        return request
            .post('/api/auth/signin')
            .send({
                avatar: 'riveter',
                username: 'mja23',
                email: 'bad@me.com',
                password: 'abc123',
                zip: 97306
            })
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid email or password');
            });
    });
});