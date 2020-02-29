require('dotenv').config();
const {server} = require('./App.js');
const {PORT} = process.env;

server.listen(5000, (error)=>{
    if(error){
        console.log(error);
    }
    console.log(`Rodando na porta ${PORT}`);
});