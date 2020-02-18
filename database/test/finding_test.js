const assert = require('assert');

const User = require('../models/users');

const mongoose = require('mongoose');
const DATABASE = 'discord-db';

//Describe the test
describe('Finding records', () => {
    let user;

    beforeEach(done => {
        user = new User({
            name: 'test-user',
        });

        user.save().then(() => {
            assert(!user.isNew);
            done();
        });
    });

    it('Finds one record from the database.', done => {
        User.findOne({ name: 'test-user' }).then(result => {
            assert(result.name === 'test-user');
            done();
        });
    });

    it('Find one record by ID from the database.', done => {
        User.findOne({ _id: user._id }).then(result => {
            assert(result.equals(user));
            done();
        });
    });

    after(() => {
        mongoose.connection.close();
    });
});
