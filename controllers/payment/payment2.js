const pagarme = require('pagarme');
const { OrderModel } = require('../../models/order');

const Payment2 = (request, response) => {
  console.log(request.body)
  const { nome, card, cvv, cpf, expDate, pais, telefone, cart, id, preco, email, orderId } = request.body;
  pagarme.client.connect({ api_key: process.env.PAGARME_KEY })
    .then(client => client.transactions.create({
      amount: 1000,
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
    }))
    .then(resp => {
      console.log(resp)
      response.send('foi')
    })
    .catch(error => {
      console.log(error)
    })

}


module.exports = Payment2;