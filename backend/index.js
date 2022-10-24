const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const { generateUsername } = require('./username-gen');

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: "*" } });

mongoose.connect("mongodb://localhost:2717/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.log("mongodb error"));

mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established succesfully");
});

const port = 9000;
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);

});

var users = [];
var globalObject = {channelName: "Global", messages: []};
var channels = [];

io.on('connection', socket => {
  let socketId = socket.id;
  var username;
  do {
    username = generateUsername();
  } while (users.find(user => user.username == username));
  users.push({ id: socketId, username });
  io.emit('user-joined', socketId, username);

  socket.emit('sync', users, globalObject);

  // runs when a client disconnects
  socket.on('disconnect', () => {
    io.emit('user-left', socketId);
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == socketId) {
        users.splice(i);
        break;
      }
    }
  });

  // runs when a user sends a message
  socket.on('message', message => {
    const dateObject = new Date();
    message.time = dateObject.getFullYear() +
      "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) +
      "-" + ("0" + dateObject.getDate()).slice(-2) +
      " " + ("0" + dateObject.getHours()).slice(-2) +
      ":" + ("0" + dateObject.getMinutes()).slice(-2);
    io.emit('message', message);
    
    // cache messages in global channel
    globalObject.messages.push({
      author: message.author,
      content: message.content, 
      time: message.time
    });
  })
})

// store messages of dms
// store global messages in db
// pagination
