import { useState, useEffect, useCallback, useContext } from "react";
import Message from "./Message";
import { BiSend } from 'react-icons/bi';
import { SocketContext } from "../App";
import { UsersContext } from "../App";

export default function Chat({ messages, setMessages, setChannels, activeChannel, setActiveChannel }) {
  const { socket } = useContext(SocketContext);
  const { users, setUsers } = useContext(UsersContext);
  const [messageContent, setMessageContent] = useState("");

  // snap to ref of my message when i send it
  const setRef = useCallback(node => {
    if (false) node.scrollIntoView({ smooth: true });
  }, []);

  useEffect(() => {
    // runs when a user sends a message
    socket.on('message', message => {
      setMessages(prevMessages => prevMessages.concat(
        {
          author: message.author,
          content: message.content,
          time: message.time
        }
      ));
    });
    // runs when a new user joins the channel
    socket.on('user-joined', (id, username) => {
      setMessages(prevMessages => prevMessages.concat({ author: `${username} has joined` }));
      setUsers(prevUsers => prevUsers.concat({ id, username }));
    });

    

    return () => {
      socket.off('message');
      socket.off('user-joined');
    }
  }, []);

  const getUsername = (id) => {
    for (let i = 0; i < users.length; i++)
      if (users[i].id != id)
        return users[i].username;
  }

  const sendMessage = async () => {
    if (messageContent != "") {
      const message = {
        author: getUsername(socket.id),
        channel: "global",
        content: messageContent
      }
      socket.emit('message', message);
      setMessageContent("");
    }
    console.log(activeChannel);
  }

  const messageComponents = messages.map((el, index) => {
    return <Message
      key={index}
      author={el.author}
      content={el.content}
      time={el.time}
    />
  });

  // dummy ref to last message
  messageComponents.push(<div ref={setRef}></div>);

  return (
    <div className="chat">
      <div className="chat-history">
        {messageComponents}
      </div>
      <div className="input">
        <textarea
          className="input-box"
          placeholder={`Message global`}
          maxLength={500}
          onChange={event => {
            setMessageContent(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              event.preventDefault();
              sendMessage();
              event.target.value = "";
            }
          }}
        />
        <div className="send-button">
          <div className="send-icon"><BiSend /></div>
        </div>
      </div>
    </div>
  );
}