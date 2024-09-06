const express = require('express')
const main = require('../../OpenAi/service')
const ChatGpt = require('../../OpenAi/service')
const server = express()

server.get('/', (req, res) => {
    res.send('Hello World!')
  })

server.post('/', ChatGpt)


module.exports = server