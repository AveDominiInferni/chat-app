import ChannelInfo from "./ChannelInfo";
import { useState } from "react";

export default function Channels({ channels, activeChannel, setActiveChannel }) {
  const activeStyle = { "background": "#6E7271" };
  const handleClick = (id) => {
    console.log(id, activeChannel);
    setActiveChannel(id);
  }

  const channelComponents = channels.map((el, index) => {
    return (
      <div className="user-info info-component"
        key={index}
        onClick={() => handleClick(el.id)}
        style={activeChannel == el.id ? activeStyle : null}
      >
        <div className="user-pic info-pic-component"></div>
        <div className="username info-name-component">{el.username}</div>
      </div >
    )

  });

  return (
    <div className="channels sidebar">
      {channelComponents}
    </div>
  );
}