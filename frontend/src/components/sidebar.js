import ChannelInfo from "./ChannelInfo";
import { useState } from "react";

export default function Sidebar() {
  const [channels, setChannels] = useState(["Global", "[DM] Ajsel Zilic"]);

  const channelComponent = channels.map(el => {
    return <ChannelInfo channelName={el} id={el} picture={""}/>
  })

  return (
    <div className="sidebar">
      {channelComponent}
    </div>
  );
}