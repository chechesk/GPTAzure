const express = require('express')
const Route = require('./router/index');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = express()

server.use(bodyParser.json());
server.use('/', Route)
server.use(express.json());
server.use(morgan('dev'));
server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

module.exports = server;