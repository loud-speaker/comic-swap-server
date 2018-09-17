const { assert } = require('chai');
const YourModel = require('../../lib/models/your-model');
// const { getErrors } = require('./helpers');

describe('YourModel model', () => {

    it('validates good model', () => {
        const data = {
            // example full, good data
        };
        const yourModel = new YourModel(data);

        const json = yourModel.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(yourModel.validateSync());
    });

});