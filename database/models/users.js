const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the User Schema and Model
const UserSchema = new Schema({
    name: String,
    //Other stuff
});

const User = mongoose.model('user', UserSchema);

module.exports = User;