const express = require('express')
const Route = require('../router/index');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = express()
const cors = require('cors')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

server.use(cors(corsOptions))
server.use(bodyParser.json());
server.use('/', Route)
server.use(express.json());
server.use(morgan('dev'));
server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

module.exports = server;