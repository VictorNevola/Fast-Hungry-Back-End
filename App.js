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
//   // origin: ["https://fomerapida.herokuapp.com/"]
//   origin: ["http://localhost:3000/"]
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

const io = socketIo(server);

let clients = {};

io.on("connection", socket => {
  socket.on("userLogin", (user) => {
    let id = socket.id;
    clients[id] = user;
    const message1 = clients[socket.id]
    io.sockets.emit(`table`, clients[socket.id]);
  })

  socket.on("hello", (hello) => {
    const message = `Hello from ${clients[socket.id]}`
    io.sockets.emit(`hello`, message);
  })

  socket.on("cart", (food) => {
    let bigTime = "0:00";
    food.cart.map(iten => {
      iten.status = 'realizando';
      if(iten.time > bigTime){
        bigTime = iten.time;
      }
    });
    const saveOrder = async (food) => {
      try {
        const number = await OrderModel.countDocuments();
        OrderModel.create({
          clientId: food.id,
          numberOrder: number + 1,
          mesa: food.mesa,
          order: food.cart,
          tempoTotalInicial: bigTime,
          tempoTotalRestante: bigTime,
        })
          .then(resp => {
            io.sockets.emit('orders', resp)
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
    const user = socket.id
    delete clients[user];
    io.sockets.emit(`offline`, clients);
  });

});

// server.listen(5000);

module.exports = { server };