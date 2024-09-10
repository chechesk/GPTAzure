const express = require('express')
const ChatGpt = require('../../OpenAi/service')
const server = express()
const authRoutes = require('./auth');
const auth = require('../../middleware/auth');

server.use('/api/auth', authRoutes);
server.get('/', (req, res) => {
    res.send('Hello World!')
  })

server.post('/', auth, ChatGpt)


module.exports = server