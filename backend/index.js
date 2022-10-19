const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 9000;

const messageRouter = require('./routes/messages');

mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established succesfully");
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.use("/messages", messageRouter);