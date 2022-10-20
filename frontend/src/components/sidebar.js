import '../App.css';
import { HiGlobe } from 'react-icons/hi';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li
          key={"global"}
          className="row"
          onClick={() => console.log("global pressed")}
        >
          <div className="channel-icon"><HiGlobe /></div>
          <div className="channel-name">Global</div>
        </li>
      </ul>
    </div>
  );
}