const { assert } = require('chai');
const User = require('../../lib/models/user');
// const { getErrors } = require('./helpers');

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

});