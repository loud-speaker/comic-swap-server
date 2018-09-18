const { assert } = require('chai');
const { getOneComicDetail } = require('../../lib/services/comicsApi');


describe('getOneComicDetail API call', () => {

    let batmanEternal;

    beforeEach(() => {
        batmanEternal = {
            id: 479928,
            issueName: 'Batman... Eternal?',
            volumeName: 'Batman Eternal',
            coverDate: '2015-04-01'
        };
    });

    it('Should get a comic by ID', () => {
        return getOneComicDetail(batmanEternal.id)
            .then(data => {
                assert.isDefined(data);
            });
    });

    it('Returns comic as processed data', () => {
        return getOneComicDetail(batmanEternal.id)
            .then(data => {
                console.log('DATA', data);
                assert.deepEqual(data.issueName, batmanEternal.issueName);
                assert.deepEqual(data.volumeName, batmanEternal.volumeName);
                assert.deepEqual(data.coverDate, batmanEternal.coverDate);
            });
    });

});