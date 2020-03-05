require('dotenv').config();
const {server} = require('./App.js');
const {PORT} = process.env;

server.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log(`Rodando na porta ${PORT}`);
});