import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Message from "./message";

export default function Chat({socket, username, channel}) {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user-joined', socket.id);
    });

    // runs when a new user joins the channel
    socket.on('user-joined', id => {
      setMessages(prevMessages => prevMessages.concat(
          <div>{id} joined</div>
      ));
    });

    // runs when a user leaves the channel
    socket.on('user-left', id => {
      setMessages(prevMessages => prevMessages.concat(
        <div>{id} left"</div>
      ));
    });

    // runs when a user sends a message
    socket.on('message', message => {
      setMessages(prevMessages => prevMessages.concat(
        <Message
          author={message.author}
          content={message.content}
        />
      ));
    });


    return () => {
      socket.off('connect');
      socket.off('user-joined');
      socket.off('user-left');
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
  

  return (
    <div className="chat">
      <div className="chat-history">
        {messagesComponent}
      </div>
      <div className="chat-box">
        <textarea
          className="input-box"
          placeholder={`Message ${channel}`}
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
      </div>
    </div>
  );
}