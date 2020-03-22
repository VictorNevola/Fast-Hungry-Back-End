const {ProductModel} = require("../../models/product");


const listAllProduct = (request, response) => {    
    ProductModel.find({})
    .then((succes)=> {
        response.status(200).json(succes);
    })
    .catch((err)=>{
        response.status(400).json({messagem: "DEu muito ruim"})
    })
}

module.exports = listAllProduct;