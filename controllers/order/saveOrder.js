const { OrderModel } = require("../../models/order");

const saveOrder = async (order) => {

  try {
    const number = await OrderModel.countDocuments();
    OrderModel.create({
      numberOrder: number + 1,
      order: order
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