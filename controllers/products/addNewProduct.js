const { ProductModel } = require("../../models/product");
const { CategoryModel } = require("../../models/category");

const createProduct = (request, response) => {
    let name = request.body.name;
    let price = request.body.price;
    let time = request.body.time;
    let category = request.body.category;
    
    ProductModel.findOne({ "name": name })
        .then((succes) => {
            if (succes) {
                response.status(409).json({ message: 'Produto ja cadastrado' })
            }
            else {
                ProductModel.create({
                    name: name,
                    price: price,
                    time: time,
                    category: category,
                })
                    .then((succes) => {
                        updatequantityProducts(succes.category);
                        response.status(200).json(succes);
                    })
                    .catch((err) => {
                        console.log('Deu muito Ruiiiim');

                    })
            }
        })
}

const updatequantityProducts = (category) => {
    CategoryModel.findOne({"name":category})
    .then((succes)=>{
        let quantityBefore = succes.quantityProducts;
        let quantityAfter = quantityBefore +=1;
        CategoryModel.findOneAndUpdate({"name": category}, {quantityProducts: quantityAfter})
        .then((succes)=>{
            return succes;
        })
        .catch((err)=>{
            return err;
        })
    }) 
    .catch((err)=>{
        console.log(err);
    })
    
}

module.exports = createProduct