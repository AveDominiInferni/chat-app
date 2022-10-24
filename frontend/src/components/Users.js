import { useContext, useEffect } from "react";
import { SocketContext } from "../App";
import { UsersContext } from "../App";

export default function Users({ myUsername, channels, setChannels, setActiveChannel}) {
  const { socket } = useContext(SocketContext);
  const { users } = useContext(UsersContext);

  const handleClick = (user) => {
    if (user != myUsername) {
      setActiveChannel(user);
      if (!channels.has(user))
        setChannels(prev => prev.set(user, new Array(0)));
    } 
  };

  const userComponents = users.map((el, index) => {
    return (
      <div className="user-info info-component" key={index} onClick={() => handleClick(el)}>
        <div className="user-pic info-pic-component"></div>
        <div className="username info-name-component">{el}</div>
      </div>
    )
  });
  
  return (
    <div className="users sidebar sidebar-right">
      {userComponents}
    </div>
  );
}