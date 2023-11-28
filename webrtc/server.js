const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

// room에 접속하면 고유한 uuid 값을 가진 url로 redirect tlzla
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

// room에 접속하면 환자-의사 같은 room에 접속할 수 있도록 함.
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

// 의사쪽을 서버라고 보면 room에 들어온 client에 대해 userId 값을 받고, 
// 환자가 disconnect 하면 해당 Room에 대한 stream을 모두 종료함. 
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)