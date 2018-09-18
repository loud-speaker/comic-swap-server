const { assert } = require('chai');
const Catalog = require('../../lib/models/catalog');
const { getErrors } = require('./helpers');

describe('Catalog model', () => {

    it('validates good model', () => {
        const data = {
           
        };
        const catalog = new Catalog(data);
        const json = catalog.toJSON();
        delete json._id;
        json.personCredits.forEach(p => delete p._id);


        assert.deepEqual(json, data);
        assert.isUndefined(catalog.validateSync());
    });

    it('validates required fields', () => {
        const catalog = new Catalog({});
        const errors = getErrors(catalog.validateSync(), 6);

        assert.equal(errors.userId.kind, 'required');

    });

});