const createUser = require('./authentication/createUser');
const userAuthentication = require('./authentication/loginAuthentication');
const updateUser = require('./authentication/updateAuthUser');
const socket = require('./socket/socketConnection');
const saveOrder = require('./order/saveOrder');
const updateOrder = require('./order/updateOrder');

module.exports = {createUser, userAuthentication, updateUser, socket, saveOrder, updateOrder};