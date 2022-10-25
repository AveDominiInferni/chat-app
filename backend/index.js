const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { generateUsername } = require('./username-gen');

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: "*" } });

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

var globalMessages = [];
var connections = new Map(); // { username: socket}
var users = new Map(); // { id: username}

io.on('connection', socket => {
  var username;
  do { username = generateUsername() } while (connections.has(username));
  users.set(socket.id, username);
  connections.set(username, socket);
  io.emit('user-joined', username);
  var usernames = [];
  for (const [key, value] of users) usernames.push(value);
  socket.emit('sync', usernames, globalMessages, username);

  // runs when a client disconnects
  socket.on('disconnect', () => {
    io.emit('user-left', users.get(socket.id));
    connections.delete(users.get(socket.id));
    users.delete(socket.id);
  });

  // runs when a user sends a message
  socket.on('message', message => {
    message["author"] = users.get(socket.id);
    message["time"] = getTime();
    io.emit('message', message);
    // cache messages in global channel
    globalMessages.push(message);
  });

  // runs when someone sends a direct message
  socket.on('dm', (message, username) => {
    message["author"] = users.get(socket.id);
    message["time"] = getTime();
    connections.get(username).emit('dm', message);
    connections.get(message.author).emit('dm', message, username);
  });
});

// store global messages in db
// pagination

function getTime() {

  const dateObject = new Date();
  return dateObject.getFullYear() +
    "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) +
    "-" + ("0" + dateObject.getDate()).slice(-2) +
    " " + ("0" + dateObject.getHours()).slice(-2) +
    ":" + ("0" + dateObject.getMinutes()).slice(-2);
}
