const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect("mongodb+srv://admin:admin@node-baita-jtk7c.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;