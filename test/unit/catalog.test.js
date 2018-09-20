const { assert } = require('chai');
const Catalog = require('../../lib/models/catalog');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose');

describe('Catalog model', () => {

    it('validates good model', () => {
        const data = {
            user: Types.ObjectId(),
            comic: Types.ObjectId(),
            condition: 'Good',
            exchange: 'Own'
        };
        const catalog = new Catalog(data);
        const json = catalog.toJSON();
        delete json._id;

        assert.deepEqual(json, data);
        assert.isUndefined(catalog.validateSync());
    });

    it('validates required fields', () => {
        const catalog = new Catalog({});
        const errors = getErrors(catalog.validateSync(), 2);

        assert.equal(errors.user.kind, 'required');
        assert.equal(errors.comic.kind, 'required');
    });

    it('returns comic condition', () => {
        const catalog = new Catalog({
            user: Types.ObjectId(),
            comic: Types.ObjectId(),
            condition: 'banana'
        });
        const errors = getErrors(catalog.validateSync(), 1);

        assert.equal(errors.condition.message, '`banana` is not a valid enum value for path `condition`.');
    });

});