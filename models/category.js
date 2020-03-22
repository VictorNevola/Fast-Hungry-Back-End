const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    quantityProducts: {type: Number, default: 0}
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = {
    CategoryModel,
};