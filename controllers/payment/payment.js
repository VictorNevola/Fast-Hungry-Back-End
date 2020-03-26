const pagarme = require('pagarme');
const { OrderModel } = require('../../models/order');

const Payment = (request, response) => {
  console.log(request.body)
  const { nome, card, cvv, cpf, expDate, pais, telefone, cart, id, preco, email, orderId } = request.body;

  // pagarme.client.connect({
  //   encryption_key: process.env.PAGARME_KEY
  // })
  //   .then(client => client.security.encrypt({
  //     amout: 100,
  //     card_number: '4111111111111111',
  //     card_holder_name: 'abc',
  //     card_expiration_date: '1225',
  //     card_cvv: '123',
  //   }))
  pagarme.client.connect({ api_key: process.env.PAGARME_KEY })
    .then(client => client.transactions.create({
      amount: 1000,
      card_number: card,
      card_holder_name: nome,
      card_expiration_date: expDate,
      card_cvv: cvv,
    }))
    .then(transaction => {
      console.log(transaction)
      // response.send('foi')
      OrderModel.findByIdAndUpdate( {_id: orderId},
                { pago: true, pagamento: transaction},
                { upsert: false},
                function(err, result) {
                  if(err){
                    console.log(err)
                  } else {
                    console.log(result)
                  }
                })
                .then((user) => {
                  console.log(user)
                })
                .catch(error => console.log(error))
              response.status(200).send(transaction);
    })
    .catch(error => {
      console.log(error)
    })
}



//   pagarme.client.connect({ api_key: process.env.PAGARME_KEY })
//     .then(client => client.transactions.create({
//       // "amount": props.state.price,
//       //   "card_number": card,
//       //   "card_cvv": cvv,
//       //   // "card_expiration_date": "0922",
//       //   "card_expiration_date": expDate,
//       //   "card_holder_name": nome,
//       //   "customer": {
//       //     "external_id": "#3311",
//       //     "name": nome,
//       //     "type": "individual",
//       //     "country": pais,
//       //     "email": "mopheus@nabucodonozor.com",
//       //     "documents": [
//       //       {
//       //         "type": "cpf",
//       //         "number": cpf
//       //       }
//       //     ],
//       //     "phone_numbers": telefone
//       //   },
//       //   "billing": {
//       //     "name": "Trinity Moss",
//       //     "address": {
//       //       "country": "br",
//       //       "state": "sp",
//       //       "city": "Cotia",
//       //       "neighborhood": "Rio Cotia",
//       //       "street": "Rua Matrix",
//       //       "street_number": "9999",
//       //       "zipcode": "06714360"
//       //     }
//       //   },
//       //   "items": props.state.cart
//       // }))
//       "amount": 100,
//       "card_number": card,
//       "card_cvv": cvv,
//       "card_expiration_date": expDate,
//       "card_holder_name": nome,
//       "customer": {
//         "external_id": id,
//         "name": nome,
//         "type": "individual",
//         "country": pais,
//         "email": "mopheus@nabucodonozor.com",
//         // "email": localStorage.getItem("email"),
//         "documents": [
//           {
//             "type": "cpf",
//             "number": cpf
//           }
//         ],
//         "phone_numbers": [`+55${telefone}`],
//         // "birthday": "1965-01-01"
//       },
//       "billing": {
//         "name": "Trinity Moss",
//         "address": {
//           "country": "br",
//           "state": "sp",
//           "city": "Cotia",
//           "neighborhood": "Rio Cotia",
//           "street": "Rua Matrix",
//           "street_number": "9999",
//           "zipcode": "06714360"
//         }
//       },
//       // "shipping": {
//       //   "name": "Neo Reeves",
//       //   "fee": 1000,
//       //   "delivery_date": "2000-12-21",
//       //   "expedited": true,
//       //   "address": {
//       //     "country": "br",
//       //     "state": "sp",
//       //     "city": "Cotia",
//       //     "neighborhood": "Rio Cotia",
//       //     "street": "Rua Matrix",
//       //     "street_number": "9999",
//       //     "zipcode": "06714360"
//       //   }
//       // },
//       "items": cart
//       // [
//       //   {
//       //     "id": "1", 
//       //     "title": "1",
//       //     "unit_price": 200,
//       //     "quantity": 2, 
//       //     "tangible": true
//       //     // "id": "r123",
//       //     // "title": "Red pill",
//       //     // "unit_price": 10000,
//       //     // "quantity": 1,
//       //     // "tangible": true
//       //   }
//       // ]
//       // [
//       //   {
//       //     "id": "r123",
//       //     "title": "Red pill",
//       //     "unit_price": 10000,
//       //     "quantity": 1,
//       //     "tangible": true
//       //   },
//       //   {
//       //     "id": "b123",
//       //     "title": "Blue pill",
//       //     "unit_price": 10000,
//       //     "quantity": 1,
//       //     "tangible": true
//       //   }
//       // ]
//     }))
//     .then(transaction => {
//       OrderModel.findByIdAndUpdate(
//         {_id: orderId},
//         { pago: true,
//           pagamento: transaction},
//         { upsert: false},
//         function(err, result) {
//           if(err){
//             console.log(err)
//           } else {
//             console.log(result)
//           }
//         })
//         // .then((user) => {
//         //   console.log(user)
//         // })
//         // .catch(error => console.log(error))
//       reponse.status(200).send(transaction);

//     })
//     .catch(error => {
//       console.log(error)
//     })
// }



module.exports = Payment;