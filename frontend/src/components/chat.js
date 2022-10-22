import Channel from "./Channel";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Chat({socket}) {
  return (
    <div className="chat">
      <Sidebar />
      <Channel socket={socket}/>
    </div>
  );
}