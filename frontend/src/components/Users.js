import { useContext, useEffect } from "react";
import { UsersContext } from "./UsersContext";
import UserInfo from "./UserInfo";
import { SocketContext } from "./SocketContext";

export default function Users({ channels, setChannels }) {
  const { socket } = useContext(SocketContext);
  const { users } = useContext(UsersContext);

  const userComponents = users.map((el, index) => {
    return <UserInfo
      key={index}
      username={el.username}
      id={el.id}
      onClick={event => {
        setChannels(prev => {
          if (!channels.find(channel => channel.username == event.target.textContent))
            return prev.concat({ id: el.id, username: el.username });
          return prev;
        })
      }}
    />;
  });

  return (
    <div className="users sidebar">
      {userComponents}
    </div>
  );
}