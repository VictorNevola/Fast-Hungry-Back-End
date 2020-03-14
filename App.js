const express = require('express');
const { router } = require(`./routes`);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const { mongoConnect } = require(`./resources/mongo`);
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const { saveOrder } = require('./controllers/order/saveOrder');
const { OrderModel } = require("./models/order");


mongoConnect();
// app.use(cors({
//   credentials: true,
//   origin: [process.env.FRONT_URL]
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

const io = socketIo(server);
// const socket = require('./controllers/socket/socketConnection')
// socket.start(io);

let clients = {};

io.on("connection", socket => {

  console.log("New client", socket.id);
  io.emit('up', { message: 'teste'});
  // exemplo https://www.freecodecamp.org/news/how-to-create-a-realtime-app-using-socket-io-react-node-mongodb-a10c4a1ab676/

  socket.on("log", (user) => {
    // chamar isso com nome do user para atrelar os dados
    let id = socket.id; 
    clients[id] = user;
    console.log(clients[socket.id])
    const message1 = clients[socket.id]
    // socket.broadcast.emit('table', message1);
    io.sockets.emit(`table`, clients[socket.id]);
    console.log(clients)
  })

  socket.on("hello", (hello) => {
    console.log(`hello from server`);
    const message = `Hello from ${clients[socket.id]}`
    io.sockets.emit(`hello`, message);
  })

  socket.on("cart", (food) => {
    // console.log('IIIIIIIDDDDD',socket.id);
    // console.log(clients)
    // console.log(clients[socket.id])
    // console.log('fooooooooooooooooooooooooood',food)
    const saveOrder = async (food) => {
      // console.log(food[0].time)
      try {
        const number = await OrderModel.countDocuments();
        console.log(food.mesa);
        console.log(food);
        OrderModel.create({
          clientId: food.id,
          numberOrder: number + 1,
          mesa: food.mesa,
          order: food.cart,
          tempoTotalInicial: food.cart[0].time,
          tempoTotalRestante: food.cart[0].time,
        })
          .then(resp => {
            io.sockets.emit('orders', resp)
            console.log('resppppppppp',resp)
          })
          .catch(error => {
            console.log(error)
          })
      } catch (error) {
        console.log(error);
      }
    }
    saveOrder(food);
  })


  socket.on("disconnect", () => {
    console.log("user disco",socket.id);
    const user = socket.id
    delete clients[user]
    io.sockets.emit(`offline`, clients);
  });

});

// server.listen(5000);

module.exports = { server };