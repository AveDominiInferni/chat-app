import './App.css';
import { useState, useEffect} from 'react';
// import { Switch, Route, Link } from 'react-router-dom';
// import Join from './components/join';
// import Message from './components/message';
import Navbar from './components/navbar';

import Users from './components/users';
import Sidebar from './components/sidebar';
import Chat from './components/chat';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:9000");

function App() {

  return (
    <div className="App">
      <Sidebar />
      <Chat socket={socket}/>
      <Users />
    </div>
  );
}

export default App;
