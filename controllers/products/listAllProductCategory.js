const { ProductModel } = require("../../models/product");


const listAllProductCategory = (request, response) => {
    const category = request.body.category;

    ProductModel.find({ category: category })
        .then((succes) => {
            response.status(200).json(succes);
        })
        .catch((err) => {
            response.status(400).json({ messagem: "DEu muito ruim" })
        })
}

module.exports = listAllProductCategory;