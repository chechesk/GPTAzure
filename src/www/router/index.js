const express = require('express')
const ChatGpt = require('../../OpenAi/service')
const server = express()
const authRoutes = require('./auth');

server.use('/api/auth', authRoutes);
server.get('/', (req, res) => {
    res.send('Hello World!')
  })

server.post('/', ChatGpt)


module.exports = server