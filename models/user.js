const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    locale: String,
    authType: [],
    password: String,
    token: String
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel,
};