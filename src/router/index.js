require('dotenv').config();
const express = require('express')
const ChatGptMERN = require('../OpenAi/service')
const server = express()
const authRoutes = require('./auth');
const auth = require('../middleware/auth');
const ChatGptGeneral = require('../OpenAi/serviceGeneral');
const uploadIMG = require('../middleware/uploadIMG');

server.get('/', (req, res) => {
    res.send('Hello World!')

server.use('/api/auth', authRoutes);
  })
server.post('/mern', auth, ChatGptMERN)
server.post('/', auth, ChatGptGeneral)
server.post('/upload', uploadIMG)
server.get('/upload', (req,res)=>{
  res.send('test')
})



module.exports = server