const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: String,
    time: String,
    category: String,
});

const ProductModel = mongoose.model('Products', ProductSchema);

module.exports = {
    ProductModel,
};