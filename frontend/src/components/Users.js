import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import { UsersContext } from "../App";

export default function Users({ channels, setChannels, setActiveChannel}) {
  const { socket } = useContext(SocketContext);
  const { users } = useContext(UsersContext);

  const handleClick = (user) => {
    if (user.id != socket.id) {
      if (!channels.find(el => el.id == user.id))
        setChannels(prev => prev.concat({ username: user.username, id: user.id }));
      setActiveChannel(user.id);
    } 
  }

  const userComponents = users.map((el, index) => {
    return (
      <div className="user-info info-component" key={index} onClick={() => handleClick(el)}>
        <div className="user-pic info-pic-component"></div>
        <div className="username info-name-component">{el.username}</div>
      </div>
    )
  });
  
  return (
    <div className="users sidebar sidebar-right">
      {userComponents}
    </div>
  );
}