const createUser = require('./authentication/createUser');
const userAuthentication = require('./authentication/loginAuthentication');
const updateUser = require('./authentication/updateAuthUser');
const socket = require('./socket/socketConnection');
const saveOrder = require('./order/saveOrder');
const updateOrder = require('./order/updateOrder');
const Payment = require('./payment/payment');
const paid = require('./order/paid');
const findFood = require('./order/findOrder');
const auth = require('./authentication/auth');
const createCategory = require('./categorys/addNewCategory');
const listAllCategory = require('./categorys//listAllCategory');
const createProduct = require('./products/addNewProduct');
const listAllProduct = require('./products/listAllProduct');
const listAllProductCategory = require('./products/listAllProductCategory');
module.exports = {createUser, userAuthentication, updateUser, socket, saveOrder, updateOrder, Payment, paid, findFood, auth, createCategory, listAllCategory, createProduct, listAllProduct, listAllProductCategory};

