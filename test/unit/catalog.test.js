const { assert } = require('chai');
const Catalog = require('../../lib/models/catalog');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose');

describe.only('Catalog model', () => {

    it('validates good model', () => {
        const data = {
            userId: Types.ObjectId(),
            comicId: [Types.ObjectId(), Types.ObjectId()],
            condition: 'good'
        };
        const catalog = new Catalog(data);
        const json = catalog.toJSON();
        delete json._id;
        json.comicId.forEach(c => delete c._id);

        assert.deepEqual(json, data);
        assert.isUndefined(catalog.validateSync());
    });

    it('validates required fields', () => {
        const catalog = new Catalog({});
        const errors = getErrors(catalog.validateSync(), 1);

        assert.equal(errors.userId.kind, 'required');
    });

});