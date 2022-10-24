import './App.css';
import { io } from 'socket.io-client';
import { createContext, useEffect, useState, useReducer } from 'react';
import Channels from "./components/Channels";
import Chat from "./components/Chat";
import Users from "./components/Users";
import { BiListUl } from 'react-icons/bi';
import { BsPersonLinesFill } from 'react-icons/bs';

export const SocketContext = createContext();
export const UsersContext = createContext();
const socket = io("ws://localhost:80");

function App() {
  const [myUsername, setMyUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState(new Map());
  const [channelsDisplay, setChannelsDisplay] = useState(false); // animation shenanigans, fix pls
  const [usersDisplay, setUsersDisplay] = useState(false); // // animation shenanigans, fix pls
  const [activeChannel, setActiveChannel] = useState("Global");
  const [unread, setUnread] = useState(new Array(0));
  const [, forceUpdate] = useReducer(x => x + 1, 0);


  useEffect(() => {
    // runs when a new user joins the channel
    socket.on('user-joined', username => {
      setUsers(prevUsers => prevUsers.concat(username));
      setChannels(prev => {
        if (prev.get("Global"))
          return prev.set("Global", prev.get("Global").concat({
            author: `${username} has joined`,
            content: null,
            time: null
          }));
        else
          return prev.set("Global", [{
            author: `${username} has joined`,
            content: null,
            time: null
          }]);
      });
    });

    // runs when a user leaves the channel
    socket.on('user-left', username => {
      if (activeChannel == username) setActiveChannel("Global");
      setChannels(prev => {
        if (channels.has(username)) prev.delete(username)
        return prev.set("Global", prev.get("Global").concat({
          author: `${username} has left`,
          content: null,
          time: null
        }));
      });
      setUsers(prev => prev.filter(el => el != username));
    });

    // runs when the user joins
    socket.on('sync', (curUsers, globalMessages, username) => {
      setMyUsername(username);
      setUsers(curUsers);
      setChannels(prev => prev.set("Global", globalMessages ? globalMessages : new Array(0)));
    });

    // runs when client receives global messaage
    socket.on('message', message => {
      setChannels(prev => prev.set("Global", prev.get("Global").concat(message)));
      if (activeChannel != "Global" && message.author != myUsername && unread.indexOf("Global") == -1) {
        setUnread(prev => prev.concat("Global"));
      }

      forceUpdate(); // because react ignores setters on complex states
    });

    // runs when client receives a dm
    socket.on('dm', (message, to) => {
      if (!to && activeChannel != message.author && unread.indexOf(message.author) == -1)
        setUnread(prev => prev.concat(message.author));
      setChannels(prev => {
        if (to) { // if i am the sender
          if (prev.get(to)) return prev.set(to, prev.get(to).concat(message));
          else return prev.set(to, [message]);
        }
        else { // if i am the receiver
          if (prev.get(message.author))
            return prev.set(message.author, prev.get(message.author).concat(message));
          else return prev.set(message.author, [message]);
        }
      });
      forceUpdate(); // because react ignores setters on complex states
    });

    return () => {
      socket.off('sync');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('message');
      socket.off('dm');
    }
  }, [activeChannel]);

  const onChannelsClick = () => {
    if (!usersDisplay) setChannelsDisplay(prev => !prev);
  }
  const onUsersClick = () => {
    if (!channelsDisplay) setUsersDisplay(prev => !prev);
  }

  // spagheti code below
  var mediaStyle = {};
  if (channelsDisplay) {
    mediaStyle = {
      "marginLeft": "0em",
      "marginRight": "-30em",
      "transition": ".4s"
    }
  }
  else if (usersDisplay) {
    mediaStyle = {
      "marginLeft": "-30em",
      "marginRight": "0em",
      "transition": ".4s"
    }
  }
  else {
    mediaStyle = {
      "marginLeft": "-15em",
      "marginRight": "-15em",
      "transition": ".4s"
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
            <Channels channels={channels} activeChannel={activeChannel} setActiveChannel={setActiveChannel} unread={unread} setUnread={setUnread} />
            <Chat myUsername={myUsername} channels={channels} setChannels={setChannels} activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
            <Users myUsername={myUsername} channels={channels} setChannels={setChannels} setActiveChannel={setActiveChannel} />
          </div>
        </UsersContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
