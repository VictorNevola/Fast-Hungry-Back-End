const { OrderModel } = require("../../models/order");

const updateOrder = (request, response) => {
    let  order = request.body;

    OrderModel.findByIdAndUpdate({_id: order._id}, order, {new: true} )
    .then((sucess)=> {
        response.status(200).json(sucess);
    })
    .catch((err)=>{
        response.status(400).json({messagem: "Deu muito ruim ao atualizar"});
    });
}

module.exports = updateOrder;