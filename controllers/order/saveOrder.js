const { OrderModel } = require("../../models/order");

const saveOrder = async (order) => {
  console.log(order)
  try {
    const number = await OrderModel.countDocuments();
    console.log(number);
    OrderModel.create({
      numberOrder: number + 1,
      order: order,
      pagamento: ''
    })
      .then(resp => {
        console.log(resp)
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.log(error);
  }
  // OrderModel.create()
}

module.exports = saveOrder;