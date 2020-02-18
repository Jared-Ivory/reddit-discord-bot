// const assert = require('assert');

// const User = require('../models/users');

// const mongoose = require('mongoose');
// const DATABASE = 'discord-db';

// //Describe the test
// describe('Deleting records', () => {
//     let user = new User({
//         name: 'test-user',
//     });

//     user.save().then(() => {
//         assert(!user.isNew);
//         done();
//     });

//     it('Deletes one record from the database.', done => {
//         User.findOneAndRemove({ name: 'test-user' }).then(result => {
//             User.findOne({ name: 'test-user' }).then(result => {
//                 assert(!result);
//             });
//             done();
//         });
//     });

//     after(() => {
//         mongoose.connection.close();
//     });
// });
