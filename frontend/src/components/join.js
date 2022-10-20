import { useState } from "react";

export default function Join() {

  return (
    <div className="join-page">
      <button onClick={() => generateNick()}>Generate random nick</button>
      <div>{nick}</div>
    </div>
  );
}