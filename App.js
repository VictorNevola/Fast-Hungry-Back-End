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
app.use(cors({
  credentials: true,
  origin: ["https://fomerapida.herokuapp.com/"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

const io = socketIo(server);

let clients = {};

io.on("connection", socket => {

  console.log("New client", socket.id);
  io.emit('up', { message: 'teste'});
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
    const saveOrder = async (food) => {
      try {
        const number = await OrderModel.countDocuments();
        console.log(number);
        OrderModel.create({
          numberOrder: number + 1,
          order: food,
          tempoTotalInicial: food[0].time,
          tempoTotalRestante: food[0].time,
        })
          .then(resp => {
            io.sockets.emit('orders', resp)
            console.log(resp)
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