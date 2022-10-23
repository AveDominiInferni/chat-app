export default function UserInfo({username, id, picture="", onClick}) {
  return (
    <div className="user-info info-component" onClick={onClick}>
      <div className="user-pic info-pic-component"></div>
      <div className="username info-name-component">{username}</div>
    </div>
  );
}