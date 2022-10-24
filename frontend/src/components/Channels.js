

export default function Channels({ channels, activeChannel, setActiveChannel, unread, setUnread }) {
  const handleClick = (name) => {
    setActiveChannel(name);
    if (unread.indexOf(name) != -1) unread.splice(name, 1);
  }
  const activeStyle = {"background" : "#C73E1D"};
  const unreadStyle = {"background" : "#BDB246"};
  const defaultStyle = {"background" : "#1F1E1E"};

  var channelComponents = [];
  try {
    for (const [key, value] of channels) {
      channelComponents.push(
        <div className="user-info info-component"
          key={key}
          onClick={() => handleClick(key)}
          style={ activeChannel == key ? activeStyle : (unread.indexOf(key) != -1 ? unreadStyle : defaultStyle) }
        >
          <div className="user-pic info-pic-component"></div>
          <div className="username info-name-component">{key}</div>
        </div >
      );
    }
  } catch (err) {

  }


  return (
    <div className="channels sidebar">
      {channelComponents}
    </div>
  );
}