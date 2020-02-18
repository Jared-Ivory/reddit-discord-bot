const assert = require('assert');

const User = require('../models/users');

const mongoose = require('mongoose');
const DATABASE = 'discord-db';

//Describe the test
describe('Saving records', () => {
    before(done => {
        mongoose.connect(`mongodb://localhost/${DATABASE}`);

        mongoose.connection.once('open', () => {
            console.log(`Connected to ${DATABASE}`);
        });
        mongoose.connection.on('error', error => {
            console.log('Connection error:', error);
        });
        done();
    });

    beforeEach(()=>{
        //Drop the collection
        mongoose.connection.collections.users.drop().then(()=>{
            //Drop the 'user' collection
            done();
        });
    })


    //Create tests
    it('Saves a record to the database', done => {
        let user = new User({
            name: 'test-user',
        });

        user.save().then(() => {
            assert(!user.isNew);
            done();
        });
        
    })
});
