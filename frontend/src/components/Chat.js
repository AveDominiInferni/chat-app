import { useState, useCallback, useContext } from "react";
import Message from "./Message";
import { BiSend } from 'react-icons/bi';
import { SocketContext } from "../App";

export default function Chat({ myUsername, channels, activeChannel }) {
  const { socket } = useContext(SocketContext);
  const [messageContent, setMessageContent] = useState();

  const sendMessage = async () => {
    if (messageContent != "") {
      const message = {
        content: messageContent
      }
      if (activeChannel == "Global") socket.emit('message', message);
      else socket.emit('dm', message, activeChannel);
      setMessageContent("");
    }
  }

  const handleSend = (event) => {
    if (event.key == "Enter" || event.type == "click") {
      event.preventDefault();
      sendMessage();
      setMessageContent("");
    }
  }

  const handleChange = (event) => {
    setMessageContent(event.target.value);
  }

  var messageComponents;
  try {
    messageComponents = channels.get(activeChannel).map((el, index) => {
      return <Message
        key={index}
        author={el.author}
        content={el.content}
        time={el.time}
      />
    });
  } catch (err) {

  }

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
          onChange={handleChange}
          onKeyDown={handleSend}
          value={messageContent}
        />
        <div className="send-button">
          <button className="send-icon" onClick={handleSend}>
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
