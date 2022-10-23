import ChannelInfo from "./ChannelInfo";
import { useState } from "react";

export default function Channels({ channels, setChannels }) {
  const channelComponents = channels.map((el, index) => {
    return <ChannelInfo key={index} channelName={el.username} id={el.id} picture={""}/>
  })

  return (
    <div className="channels sidebar">
      {channelComponents}
    </div>
  );
}