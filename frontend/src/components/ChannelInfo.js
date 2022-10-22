export default function ChannelInfo({channelName, id, picture=""}) {
  return (
    <div className="channel-info info-component">
      <div className="channel-pic info-pic-component"></div>
      <div className="channel-name info-name-component">{channelName}</div>
    </div>
  );
}