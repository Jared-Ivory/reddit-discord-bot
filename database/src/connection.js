const mongoose = require('mongoose');
const DATABASE = 'discord-db';

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to mongodb
mongoose.connect(`mongodb://localhost/${DATABASE}`);

mongoose.connection.once('open', () => {
    console.log(`Connected to ${DATABASE}`);
});
mongoose.connection.on('error', error => {
    console.log('Connection error:', error);
});
