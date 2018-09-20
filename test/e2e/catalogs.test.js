const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./_db');
const { Types } = require('mongoose');

describe.only('Catalog API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('comics'));
    beforeEach(() => dropCollection('catalogs'));

    let token = null;
    let mariah;
    let data = {
        avatar: 'riveter',
        username: 'mja23',
        email: 'test@test.com',
        password: 'abc123',
        zip: 97306
    };

    const batmanEternal = {
        comicId: 479928,
        issueName: 'Batman... Eternal?',
        volumeName: 'Batman Eternal',
        coverDate: '2015-04-01',
        description: 'I\'m Batman.',
        image: 'url'
    };

    let catalog;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(data)
            .then(({ body }) => {
                token = body.token;
                mariah = body;
                batmanEternal.user = mariah;
            });
    });

    beforeEach(() => {
        return request
            .post('/api/catalogs')
            .set('Authorization', token)
            .send({
                user: mariah._id,
                comic: Types.ObjectId(),
                condition: 'Good'
            })
            .then(({ body }) => {
                catalog = body;
            });
    });

    it('adds a comic to a catalog', () => {
        assert.isOk(catalog._id);
    });

    it('gets a catalog list', () => {
        return request
            .get('/api/catalogs')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.deepEqual(body, [catalog]);
            });
    });

    it('it gets catalog items by userId', () => {
        return request
            .get(`/api/catalogs/${catalog.user}`)
            .set('Authorization', token)
            .then(({ body }) => {
                assert.deepEqual(body[0].user, catalog.user);
            });
    });

    it('deletes a catalog item', () => {
        return request
            .del(`/api/catalogs/${catalog._id}`)
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isTrue(body.removed);
            });
    });

    it('updates a catalog item on PUT', () => {
        catalog.condition = 'Fine';
        return request
            .put(`/api/catalogs/${catalog._id}`)
            .set('Authorization', token)
            .send(catalog)
            .then(({ body }) => {
                assert.equal(body.condition, catalog.condition);
            });
    });

});