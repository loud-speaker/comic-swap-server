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
            .post('/api/auth/signing')
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
});