const createUser = require('./authentication/createUser');
const userAuthentication = require('./authentication/loginAuthentication');
const updateUser = require('./authentication/updateAuthUser');
const socket = require('./socket/socketConnection');

module.exports = {createUser, userAuthentication, updateUser, socket};