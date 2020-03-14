const { OrderModel } = require("../../models/order");

const findFood = (req, resp) => {
  const foodId = req.body.pedido;
  console.log('id',foodId)
  OrderModel.find({_id: foodId})
  .then(food => {
    console.log(food);
    resp.status(200).send(food);
  })
  .catch(error => {
    console.log(error);
    resp.status(404).send('Food not found');
  })
}

module.exports = findFood;