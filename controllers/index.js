const createUser = require('./authentication/createUser');
const userAuthentication = require('./authentication/loginAuthentication');
const updateUser = require('./authentication/updateAuthUser');
const socket = require('./socket/socketConnection');
const saveOrder = require('./order/saveOrder');
const Payment = require('./payment/payment');
const paid = require('./order/paid');
const findFood = require('./order/findOrder');
const auth = require('./authentication/auth')

module.exports = {createUser, userAuthentication, updateUser, socket, saveOrder, Payment, paid, findFood, auth};