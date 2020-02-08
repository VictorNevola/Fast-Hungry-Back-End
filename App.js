const express = require('express');
const {router} = require(`./routes`);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const {mongoConnect} = require(`./resources/mongo`);
const app = express();

mongoConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

module.exports = {app};