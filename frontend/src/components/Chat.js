import { useState, useCallback, useContext, useReducer, useRef } from "react";
import Message from "./Message";
import { BiSend } from 'react-icons/bi';
import { SocketContext } from "../App";
import { UsersContext } from "../App";

export default function Chat({ myUsername, channels, setChannels, activeChannel, setActiveChannel }) {
  const { socket } = useContext(SocketContext);
  const [messageContent, setMessageContent] = useState();

  // snap to ref of my message when i send it
  const setRef = useCallback(node => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

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

  // dummy ref to last message
  try {
    if (channels.get(activeChannel)[channels.get(activeChannel).length - 1].author == myUsername)
      messageComponents.push(<div ref={setRef}></div>);
  } catch (err) { }

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
