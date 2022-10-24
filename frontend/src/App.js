import './App.css';
import { io } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import Channels from "./components/Channels";
import Chat from "./components/Chat";
import Users from "./components/Users";
import { BiListUl } from 'react-icons/bi';
import { BsPersonLinesFill } from 'react-icons/bs';

export const SocketContext = createContext();
export const UsersContext = createContext();

const socket = io("ws://localhost:9000");

function App() {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([{ username: "Global", id: "Global" }]);
  const [messages, setMessages] = useState([]);
  const [channelsDisplay, setChannelsDisplay] = useState(false);
  const [usersDisplay, setUsersDisplay] = useState(false);
  const [activeChannel, setActiveChannel] = useState("Global");

  useEffect(() => {
    console.log('rerender');
    socket.on('connect', () => {
      socket.emit('user-joined', socket.id);
    });

    // runs when a user leaves the channel
    socket.on('user-left', id => {
      var username;
      if (activeChannel == id) setActiveChannel("Global");
      setUsers(prev => {
        var temp = [];
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id != id) temp.push(prev[i]);
          else username = prev[i].username
        }
        return temp;
      });
      setChannels(prev => prev.filter(el => el.id != id));
      setMessages(prev => prev.concat({ author: `${username} has left` }));
    });

    // runs when the user joins
    socket.on('sync', (curUsers, globalObj) => {
      setUsers(curUsers);
      setMessages(globalObj.messages);
    });

    return () => {
      socket.off('message');
      socket.off('user-left');
    }
  }, [activeChannel]);

  const onChannelsClick = () => {
    if (!usersDisplay) setChannelsDisplay(prev => !prev);
  }
  const onUsersClick = () => {
    if (!channelsDisplay) setUsersDisplay(prev => !prev);
  }

  // rewrite it with transform() for better performance
  // dont ask me about this code...
  var mediaStyle = {};
  if (channelsDisplay) {
    mediaStyle = {
      "marginLeft": "0em",
      "marginRight": "-30em",
      "transition" : ".4s"
    }
  } 
  else if (usersDisplay) {
    mediaStyle = {
      "marginLeft": "-30em",
      "marginRight": "0em",
      "transition" : ".4s"
    }
  }
  else {
    mediaStyle = {
      "marginLeft": "-15em",
      "marginRight": "-15em",
      "transition" : ".4s"
    }
  }

  return (
    <div className="App">
      <SocketContext.Provider value={{ socket }}>
        <UsersContext.Provider value={{ users, setUsers }}>
          <div className="navbar" style={mediaStyle}>
            <div className="navbar-left sidebar-left">Channels</div>
            <div className="navbar-middle">
              <button className="channels-button" onClick={onChannelsClick}>
                <BiListUl />
              </button>
              <button className="users-button" onClick={onUsersClick}>
                <BsPersonLinesFill />
              </button>
            </div>
            <div className="navbar-right sidebar-right">Users</div>
          </div>
          <div className="body" style={mediaStyle}>
            <Channels channels={channels} setActiveChannel={setActiveChannel} activeChannel={activeChannel}/>
            <Chat messages={messages} setMessages={setMessages} setChannels={setChannels} activeChannel={activeChannel} setActiveChannel={setActiveChannel}/>
            <Users channels={channels} setChannels={setChannels} setActiveChannel={setActiveChannel}/>
          </div>
        </UsersContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
