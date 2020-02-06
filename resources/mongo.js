const mongoose = require('mongoose');
const {MONGOCONNECT} = process.env;

const mongoConnect = () => {
    mongoose
        .connect(MONGOCONNECT, {useNewUrlParser: true})
        .then((success) => {
            console.log(`Conectado`);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
};

module.exports = {
    mongoConnect,
}