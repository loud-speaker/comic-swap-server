const { assert } = require('chai');
const { getComicsList } = require('../../lib/services/comicsApi');

describe('getComicsList API call', () => {

    it('Should get comic list', () => {
        return getComicsList()
            .then(data => {
                assert.isDefined(data);
            });
    });

    it('Returns comic list as processed data', () => {
        return getComicsList(2)
            .then(data => {
                assert.deepEqual(data[0].id, 6);
                assert.deepEqual(data[1].id, 7);
                assert.deepEqual(data.length, 2);
            });
    });

    it('Returns filtered comic list processed data', () => {
        return getComicsList(2, 'spiderman')
            .then(data => {
                assert.deepEqual(data[0].id, 20596, 'Data[0].id');
                assert.deepEqual(data[0].name, 'Spiderman & Howard the Duck', 'Data[0].name');
                assert.deepEqual(data[1].id, 20736, 'Data[1].id');
                assert.deepEqual(data[1].name, 'Spiderman & Black Widow', 'Data[1].name');
                assert.deepEqual(data.length, 2, 'Array length');
            });
    });

    it('Returns valid data if parameters are not passed in', () => {
        return getComicsList()
            .then(data => {
                assert.isOk(data);
                assert.deepEqual(data.length, 100);
            });
    });

    it('Returns valid data if multiple words are passed to param', () => {
        // Note: API accepts multiple name:value pairs (e.g. name:spiderman,name:black%20widow)
        // but possibly checks for all matches (e.g. returns Spiderman & The Black Widow).
        // Does not appear to return results for similar (e.g. filter=name:spiderman%20black%20widow).
        return getComicsList(10, 'black widow')
            .then(data => {
                assert.isOk(data);
                assert.deepEqual(data.length, 10);
            });
    });

});