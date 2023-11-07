const { Server } = require('socket.io');

const io = new Server({cors:"*"});

let onlineUsers=[]

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);
  
    // Handle the "addNewUser" event from the client
    socket.on("addNewUser", (userId) => {
      if (userId && !onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({
          userId,
          socketId: socket.id,
        });
      }
      
  
      // Broadcast the updated online users list to all connected clients
      io.emit("getOnlineUsers", onlineUsers);
    });
//add ,essage
socket.on("sendMessage",(message)=>{
  const user=onlineUsers.find((user)=>user.userId === message.recipientId)
  if(user){

    io.to(user.socketId).emit("getMessage",message)
      }
})

    socket.on("disconnect",()=>{
      onlineUsers=onlineUsers.filter((user)=>user.socketId !== socket.id);
      io.emit("getOnlineUsers",onlineUsers)
    })


  });
io.listen(3000)