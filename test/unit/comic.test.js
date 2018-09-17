const { assert } = require('chai');
const Comic = require('../../lib/models/comic');
const { getErrors } = require('./helpers');

describe('Comic model', () => {

    it('validates good model', () => {
        const data = {
            issueName: 'The Joker Appears',
            volumeName: 'Batman',
            coverDate: '1982-10-31',
            description: 'Batman defeats the Joker',
            image: 'https://comicvine.gamespot.com/api/image/screen_kubrick/4753003-67.jpg',
            characters: ['Alan Watts', 'Aquaman'],
            personCredits: [
                { name: 'Ben Oda', role: 'letterer' },
                { name: 'Don Heck', role: 'penciler' }
            ]
        };
        const comic = new Comic(data);
        const json = comic.toJSON();
        delete json._id;
        json.personCredits.forEach(p => delete p._id);


        assert.deepEqual(json, data);
        assert.isUndefined(comic.validateSync());
    });

    it('validates required fields', () => {
        const comic = new Comic({});
        const errors = getErrors(comic.validateSync(), 5);

        assert.equal(errors.issueName.kind, 'required');
        assert.equal(errors.volumeName.kind, 'required');
        assert.equal(errors.coverDate.kind, 'required');
        assert.equal(errors.description.kind, 'required');
        assert.equal(errors.image.kind, 'required');
    });

});