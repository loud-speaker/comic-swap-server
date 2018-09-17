const { assert } = require('chai');
const User = require('../../lib/models/user');
const { getErrors } = require('./helpers');

describe.only('User model', () => {

    const data = {
        username: 'mja23',
        email: 'test@test.com',
        zip: 97302
    };
    
    const password = 'abc123';
    let user = null;

    beforeEach(() => {
        user = new User(data);
        user.generateHash(password);
    });
    
    it('generates hash from password', () => {
        assert.ok(user.hash);
        assert.notEqual(user.hash, password);
    });

    it('compares password to hash', () => {
        assert.isOk(user.comparePassword(password));
    });

    it('validates good model', () => {
        const data = {
            avatar: 'wonder woman',
            username: 'mja23',
            email: 'test@test.com',
            password: 'abc123',
            zip: 97302
        };
        const user = new User(data);

        const json = user.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(user.validateSync());
    });

    it('validates required fields', () => {
        const user = new User({});
        const errors = getErrors(user.validateSync(), 4);

        assert.equal(errors.username.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.password.kind, 'required');
        assert.equal(errors.zip.kind, 'required');
    });

});