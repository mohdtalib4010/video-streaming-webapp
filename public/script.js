
 const socket = io('/');
 const videoGrid = document.getElementById('video-grid');
 const myVideo = document.createElement('video');
 myVideo.muted = true;

 
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
});

 let myVideoStream
 navigator.mediaDevices.getUserMedia({
     video: true,
     audio: true
 }).then(stream => {
     myVideoStream = stream;
     addVideoStream(myVideo, stream);

     peer.on('call', function(call) {
        // Answer the call, providing our mediaStream
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
      })



     socket.on('user-connected', (userId) => {
     connectToNewUser(userId, stream);
    })


 })


 peer.on('open',id =>{
     socket.emit('join-room', ROOM_ID, id);
    //  console.log(id);
 })
 socket.emit('join-room', ROOM_ID);

//  socket.on('user-connected', (userId) => {
//      connectToNewUser(userId, stream);
//  })
    
const connectToNewUser = (userId, stream) => {
    //    console.log(userId);
        const call = peer.call(userId, stream)   
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
             addVideoStream(video, userVideoStream) 
        });
      }

     

 const addVideoStream = (video, stream) => {
     video.srcObject = stream;
     video.addEventListener('loadedmetadata', () => {
         video.play()
     })
     videoGrid.append(video);
 }