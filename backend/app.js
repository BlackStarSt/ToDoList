const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

require('dotenv').config();

const cors = require('cors');

const appRoutes = require('./routes/app');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO.URI)
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas da aplicação
app.use('/api/tasks', tasksRoutes);
app.use('/api/users', userRoutes);
app.use('/', appRoutes);

// Catch all route (SPA support)
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;