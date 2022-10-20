export default function Users({socket}) {
  return (
    <div className="users">
      <ul className="users-list">
        <li
          key={"global"}
          className="row"
          onClick={() => console.log("user pressed")}
        >
        </li>
      </ul>
    </div>
  );
}