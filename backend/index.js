const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: '*'}});

mongoose.connect('mongodb://localhost:2717/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.log('mongodb error'));

mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established succesfully");
});

const port = 9000;
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

let users = [];
let channels = [];

io.on('connection', socket => {
  console.log('user connected');

  // runs when a client connects
  socket.on('user-joined', () => {
    io.emit('user-joined', socket.id);
  });

  // runs when a client disconnects
  socket.on('disconnect', () => {
    io.emit('user-left', socket.id);
  });

  // runs when a user sends a message
  socket.on('message', message => {
    io.emit('message', message);
    console.log(`${message.author} to ${message.channel}: ${message.content}`);
  })

})