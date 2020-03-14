const { OrderModel } = require("../../models/order");

const paid = (req, res) => {
  const id = req.body.id;
  OrderModel.find({ clientId: id, concluido: true })
    .then(resp => {
      // console.log(resp)
      res.status(200).send(resp);
    })
    .catch(error => {
      console.log(error)
      res.status(404).send('Not found')
    })
}

module.exports = paid;