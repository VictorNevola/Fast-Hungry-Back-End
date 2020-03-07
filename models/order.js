const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  numberOrder: Number,
  order: Array,
  date: { type: Date, default: Date.now },
  ItensConcluidos:  { type: Number, default: 0},
  statusPedido:  { type: String, default: 'realizado'},
  tempoTotalInicial: String,
  tempoTotalRestante: String,
  mesa: {type: String, default: 'bancada'}
})


const OrderModel = mongoose.model('order', OrderSchema);

module.exports = {
    OrderModel,
};