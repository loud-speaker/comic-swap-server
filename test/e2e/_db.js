require('dotenv').config({ path: './test/e2e/.env' });
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/comic');
after(() => {
    return mongoose.connection.close();
});

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};