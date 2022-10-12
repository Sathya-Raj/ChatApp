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
    origin: "http://localhost:3000",
    methods:["GET","POST"],
  },
});
app.use(router);

io.on('connection',(socket)=>{
    console.log("We have a new connection!!");
    socket.on('join',({name,room},callback)=>{
      const { user, error } = addUser({id:socket.id,name,room});
      if (error) return callback(error);
      socket.emit("message",{user:"admin",text:`${user.name},welcome to the room ${user.room}`})
      socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name}, has joined the room!!`});

      socket.join(user.room);
      callback()
    });

    socket.on("sendMessage",(message,callback)=>{
      const user =getUser(socket.id);
      io.to(user.room).emit("message",{user:user.name,message:message})
      callback();
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    
});



server.listen(PORT,() => console.log(`Server running on port : ${PORT}`));