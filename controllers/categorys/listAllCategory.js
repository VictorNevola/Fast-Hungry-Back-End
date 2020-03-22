const { CategoryModel } = require("../../models/category");

const listAllCategory = (request, response) => {    
    CategoryModel.find({})
    .then((succes)=> {
        response.status(200).json(succes);
    })
    .catch((err)=>{
        response.status(400).json({messagem: "DEu muito ruim"})
    })
}

module.exports = listAllCategory;