const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: String,
    time: String,
    category: String,
    quantity: {type: Number, default: 1},
});

const ProductModel = mongoose.model('Products', ProductSchema);

module.exports = {
    ProductModel,
};