const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router= require("./router");

const PORT = process.env.PORT|| 5000;

const app = express();
const server = http.createServer(app);
const io =  socketio(server);
app.use(router);

io.on('connection',(scoket)=>{
    console.log("We have a new connection!!");
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});



server.listen(PORT,() => console.log(`Server running on port : ${PORT}`));