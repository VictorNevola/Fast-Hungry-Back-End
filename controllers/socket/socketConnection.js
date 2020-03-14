// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// // const app = express();
// // const io = socketIo(server);

module.exports = {
  start: function (io) {
    let clients = {}

    io.on("connection", socket => {

      // Colocar uma função que o usuário chama quando finalizar o pedido e que manda o pedido para outra função que só a cozinha vai receber está ouvindo
      // exemplo https://www.freecodecamp.org/news/how-to-create-a-realtime-app-using-socket-io-react-node-mongodb-a10c4a1ab676/

      socket.on("log", (user) => {
        clients[socket.id] = user;
        const message = `Hello from ${clients[socket.id]}`
        socket.broadcast.emit('up', message);
      })

      socket.on("hello", (hello) => {
        console.log(`hello from server`);
        const message = `Hello from ${clients[socket.id]}`
        io.sockets.emit(`hello`, message);
      })

      socket.on("cart", (food) => {
        console.log(food);

      })


      socket.on("disconnect", () => {
        console.log("user disco");
      });

    });
  }
}