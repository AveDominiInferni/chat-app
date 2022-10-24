export default function ChannelInfo({channelName, id, picture="", style}) {
  return (
    <div className="channel-info info-component" style={style}>
      <div className="channel-pic info-pic-component"></div>
      <div className="channel-name info-name-component">{channelName}</div>
    </div>
  );
}