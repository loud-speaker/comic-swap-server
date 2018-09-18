const { assert } = require('chai');
// const request = require('./request');
const { dropCollection  } = require('./_db');
const { getComicsList } = require('./comicsTestApi');

// const checkOk = res => {
//     assert.equal(res.status, 200, 'expected 200 http status code');
//     return res;
// };


describe('Things API', () => {

    beforeEach(() => dropCollection('comics'));

    it.only('Should get comic list', () => {
        return getComicsList()
            .then(data => {
                assert.isDefined(data);
            });
    });

    it.only('Returns comic list processed data', () => {
        return getComicsList()
            .then(data => {
                assert.deepEqual(data[0].id, 6);
                assert.deepEqual(data[1].id, 7);
                assert.deepEqual(data.length, 2);
            });
    });

    it('', () => {

    });

    it('', () => {

    });

    it('', () => {

    });

});