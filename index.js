const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const router = require('./server/router');
const cors=require('cors')
const { addUsr, removeUser, getUser, getUserInRoom } = require('./server/user');
app.use(cors())

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);
const path=require('path');
app.use(express.static(path.join(__dirname,'client/build')))
app.use('*',(req,res)=>{
    console.log(__dirname)
    console.log(path.join(__dirname,'client/build'))
    res.sendFile(path.resolve(__dirname,'client/build/index.html'))
})


io.on('connection', (socket) => {
    // console.log("We have new connection in socket");
    socket.on('join', ({ name, room },callback) => {
    //    console.log(name)
        const { error, user } = addUsr({ id: socket.id, name, room });
    //   console.log(error)
        if (error) return callback(error);
        socket.join(user.room);
        // to send new user
        socket.emit('message', { user: 'admin', text: `${user.name} , Welcome to the room ${user.room}` });
        //  to send message to other romm members
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} , has joined ` });
     
        io.to(user.room).emit('roomData',{room:user.room, users:getUserInRoom(user.room)})
        callback();
// add data server
 })

    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name,text : message});
        callback()
    })
    socket.on('disconnect', () => {
        const user=removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} left the chat`})
            // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
  });
})
server.listen(PORT, () => {
    console.log(`Server is listing on port ${PORT}`);
})