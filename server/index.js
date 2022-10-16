const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const router= require("./router");
const cors = require("cors")
const {addUser,removeUser,getUser,getUserInRoom} =require("./users.js");

const PORT = process.env.PORT|| 5000;

const app = express();

const server = http.createServer(app);
app.use(cors());
const io = new Server(server,{
  cors:{
    origin: "*",
    methods:["GET","POST"],
  },
});
app.use(router);

io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
      const { user, error } = addUser({id:socket.id,name,room});
      if (error){
         return callback(error)};
      socket.emit("message",{user:"admin",text:`Heyy ${user.name},welcome to the room ${user.room}`})
      socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name}, has joined the room!!`});

      socket.join(user.room);
      callback()
    });

    socket.on("sendMessage",(message,callback)=>{
      const user =getUser(socket.id);

      io.to(user.room).emit("message",{user:user.name,text:message});
      callback();
    })

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user){
        io.to(user.room).emit('message',{user:"admin",text:`${user.name}, has left the room `});
      }        
      });
    
});



server.listen(PORT,() => console.log(`Server running on port : ${PORT}`));