const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./_db');
const { getOneComicDetail } = require('../../lib/services/comicsApi');

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
        coverDate: '2015-04-01'
    };
    let comic;
    let catalog;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(data)
            .then(({ body }) => {
                token = body.token;
                mariah = body;
            });
    });

    beforeEach(() => {
        return getOneComicDetail(batmanEternal.comicId)
            .then(data => {
                return request
                    .post('/api/comics')
                    .send(data)
                    .then(({ body }) => {
                        comic = body;
                        assert.isOk(comic._id);
                    });
            });
    });

    beforeEach(() => {
        return request
            .post('/api/catalogs')
            .set('Authorization', token)
            .send({
                userId: mariah._id,
                comicId: comic._id,
                condition: 'poor'
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

    it('updates a catalog item on PUT', () => {
        catalog.condition = 'good';
        return request
            .put(`/api/catalogs/${catalog._id}`)
            .set('Authorization', token)
            .send(catalog)
            .then(({ body }) => {
                assert.equal(body.condition, catalog.condition);
            });
    });
});