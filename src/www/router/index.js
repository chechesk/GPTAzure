require('dotenv').config();
const express = require('express')
const ChatGptMERN = require('../../OpenAi/service')
const server = express()
const authRoutes = require('./auth');
const auth = require('../../middleware/auth');
const ChatGptGeneral = require('../../OpenAi/serviceGeneral');

server.get('/', (req, res) => {
    res.send('Hello World!')

server.use('/api/auth', authRoutes);
  })
server.post('/mern', auth, ChatGptMERN)
server.post('/', auth, ChatGptGeneral)



module.exports = server