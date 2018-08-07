const express = require('express')
const app = express()
const server = app.listen(5000)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

io.on('connection', (socket) => {
  socket.on('chat message', (text) => {
    // TODO: Include some AI here to do a conversation
    socket.emit('bot reply', text)
  })
})
