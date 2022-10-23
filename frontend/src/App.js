import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import Channels from "./components/Channels";
import Chat from "./components/Chat";
import Users from "./components/Users";
import { UsersContext } from './components/UsersContext';
import { SocketContext } from './components/SocketContext';

const socket = io("ws://localhost:9000");

function App() {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([{ username: "Global", id: null }]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user-joined', socket.id);
    });

    // runs when the user joins
    socket.on('sync', curUsers => {
      console.log("sync");
      setUsers(curUsers);
    });
  }, []);

  return (
    <div className="App">
      <SocketContext.Provider value={{ socket }}>
        <UsersContext.Provider value={{ users, setUsers }}>
          <div className="navbar">
            <div className="navbar-left">Channels</div>
            <div className="navbar-middle">#Global</div>
            <div className="navbar-right">Online</div>
          </div>
          <div className="body">
            <Channels channels={channels} setChannels={setChannels} />
            <Chat />
            <Users channels={channels} setChannels={setChannels} />
          </div>
        </UsersContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
