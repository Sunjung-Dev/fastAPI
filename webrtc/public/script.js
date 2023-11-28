const socket = io('/')
const videoGrid = document.getElementById('video-grid')
// 3001 포트를 열어서 peer을 사용할 수 있도록 ㅎ마. 
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)
  // peer가 연결되면 stream을 실행시킴 
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })
  // 소켓에 연결되면 userId를 활용하여 새로운 user와 함께 userId를 송수신하고 stream함 
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})
// userId를 가진 클라이언트가 room의 stream을 종료한다면 Peer 연결을 끊음 
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
// peer끼리 연결한다면 room_id에 대해 소켓이 연결 
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})
// 새로운 user에 대한 비디오스트림 연결하는 함수 
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}
// 클라이언트 서버 모두 새로운 사용자와 연결된다면 화면에 스트림 띄어질 수 있도록 하는 함수 
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}