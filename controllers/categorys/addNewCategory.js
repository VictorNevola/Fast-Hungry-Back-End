const { CategoryModel } = require("../../models/category");

const createCategory = (request, response) => {
    let category = request.body;
    
    CategoryModel.findOne({"name": category.name})
    .then((succes)=>{
        if(succes) {
            response.status(409).json({message: 'Categoria ja cadastrada'})
        }
        else {
            CategoryModel.create({
                name: category.name,
            })
            .then((succes)=>{
                response.status(200).json(succes);
            })
            .catch((err)=> {
                console.log('Deu muito Ruiiiim');
                
            })
        }
    })
    
}

module.exports = createCategory