const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path  = require('path');

app.use('/',express.static(path.join(__dirname,'public')));
const users={};
io.on('connection',(socket)=>{
    console.log(`Connection established ---> ${socket.id}`)
    socket.on('send_msg',(data)=>{
        io.emit('recieved_msg',{
            msg:data.msg,
            user:users[socket.id]
        })
    })
   socket.on('login',(data)=>{
       users[socket.id] =data.user;//key value pair key is socket id and value is user's name 
   })

})





const port = process.env.PORT||3000;

server.listen(port,()=>{
    console.log(`server listening at port ${port}`);
})