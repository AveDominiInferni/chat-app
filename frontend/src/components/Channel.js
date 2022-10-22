import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import Message from "./message";
import { BiSend } from 'react-icons/bi';

export default function Channel({ socket }) {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user-joined', socket.id);
    });

    // runs when a new user joins the channel
    socket.on('user-joined', (id, username) => {
      setMessages(prevMessages => prevMessages.concat(
        <div>{id} joined</div>
      ));
      setUsers(prevUsers => prevUsers.concat(id));
    });

    // runs when a user leaves the channel
    socket.on('user-left', (id, username) => {
      setMessages(prevMessages => prevMessages.concat(
        <div>{id} left"</div>
      ));
      setUsers(prevUsers => {
        let found = prevUsers.indexOf(id);
        if (found > -1) {
          console.log("found");
          prevUsers.splice(found, 1);
        }
        return prevUsers;
      })
    });

    // runs when a user sends a message
    socket.on('message', message => {
      setMessages(prevMessages => prevMessages.concat(
        <Message
          author={message.author}
          content={message.content}
        />
      ));
      console.log("message received");
    });

    console.log(users);
    return () => {
      socket.off('connect');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('message');
    };
  }, []);

  const sendMessage = async () => {
    if (messageContent != "") {
      const message = {
        // author: username,
        author: socket.id,
        // channel: channel,
        channel: "global",
        content: messageContent
      }
      socket.emit('message', message);
      setMessageContent("");
    }
  }

  const messagesComponent = messages.map((el) => {
    return el;
  })

  const usersComponent = users.map((el) => {
    return <UserInfo username={el} id={el}/>;
  })


  return (
    <div className="channel">
      <div className="window">
        <div className="chat-history">
          {messagesComponent}
        </div>
        <div className="input">
          <textarea
            className="input-box"
            placeholder={`Message global`}
            maxLength={500}
            onChange={(event) => {
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
      <div className="users sidebar">
        {usersComponent}
      </div>
    </div>
  );
}