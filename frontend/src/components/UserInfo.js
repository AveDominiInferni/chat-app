export default function UserInfo({username, id, picture=""}) {
  return (
    <div className="user-info info-component">
      <div className="user-pic info-pic-component"></div>
      <div className="username info-name-component">{username}</div>
    </div>
  );
}