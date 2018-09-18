const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');
const { getOneComicDetail } = require('../../lib/services/comicsApi');

describe('Comics DB', () => {

    let batmanEternal;

    beforeEach(() => {
        dropCollection('comics');
    });

    beforeEach(() => {
        batmanEternal = {
            comicId: 479928,
            issueName: 'Batman... Eternal?',
            volumeName: 'Batman Eternal',
            coverDate: '2015-04-01'
        };
    });

    let comic;

    beforeEach(() => {
        return getOneComicDetail(batmanEternal.comicId)
            .then(data => {
                console.log(data);
                return request
                    .post('/api/comics')
                    .send(data)
                    .then(({ body }) => comic = body);
            });
    });

    it('Should save a comic detail to DB', () => {
        assert.isOk(comic._id);
    });


});