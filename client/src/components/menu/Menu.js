import React from "react";
import io from "socket.io-client";

export const Menu = () => {
  const clickStartRoom = () => {
    const socket = io("http://localhost:6800");
  };

  return (
    <div className="Menu-container">
      <div className="menu-head"></div>
      <div className="menu-body">
        <div className="host-from-menu">Host game</div>
        <div className="join-from-menu">Join game</div>
      </div>
    </div>
  );
};
