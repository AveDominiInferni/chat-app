export default function UserInfo({username, id, picture="", handleClick}) {
  return (
    <div className="user-info info-component" onClick={() => handleClick(id)}>
      <div className="user-pic info-pic-component"></div>
      <div className="username info-name-component">{username}</div>
    </div>
  );
}