const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');
const { getOneComicDetail } = require('../../lib/services/comicsApi');

describe.only('Catalog API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('comics'));
    beforeEach(() => dropCollection('catalogs'));

    let token = null;
    let mariah = {
        avatar: 'riveter',
        username: 'mja23',
        email: 'me@me.com',
        password: 'abc123',
        zip: 97306
    };
    let batmanEternal;
    let comic;
    let catalog;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(mariah)
            .then(({ body }) => {
                token = body.token;
                assert.ok(token);
            });
    });

    beforeEach(() => {
        batmanEternal = {
            comicId: 479928,
            issueName: 'Batman... Eternal?',
            volumeName: 'Batman Eternal',
            coverDate: '2015-04-01'
        };
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

    it('adds a comic to a catalog', () => {
        return request
            .post('/api/catalog')
            .send({
                userId: mariah._id,
                comicId: comic._id,
                condition: 'poor'
            })
            .then(({ body }) => {
                catalog = body;
                assert.deepEqual(body, [catalog]);
            });
    });
});