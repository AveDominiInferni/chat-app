import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import Login from './components/Login';
import Chat from './components/Chat';

const socket = io("ws://localhost:9000");
var user = null;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Chat socket={socket}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
