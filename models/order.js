const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  clientId : String,
  numberOrder: Number,
  order: Array,
  date: { type: Date, default: Date.now },
  concluido: {type: Boolean, default: false},
  ItensConcluidos:  { type: Number, default: 0},
  statusPedido:  { type: String, default: 'realizado'},
  tempoTotalInicial: String,
  tempoTotalRestante: String,
  mesa: {type: String, default: 'bancada'},
  pago: {type: Boolean, default: false},
  pagamento: Array
  // data: new Date().toString()
  // category: String,
  // name: Number,
  // price: Number,
  // quantity: Number,
  // time: String
})


const OrderModel = mongoose.model('order', OrderSchema);

module.exports = {
    OrderModel,
};