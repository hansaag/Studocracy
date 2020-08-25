import React, { useContext } from "react";
import io from "socket.io-client";
import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";

export const Menu = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const { socketContext, setSocketContext } = useContext(SocketInfo);

  const clickStartRoom = () => {
    setSocketContext(io("http://localhost:6800"));
    setUserContext(1);
  };
  console.log("menu called");

  return (
    <div className="Menu-container">
      <div className="menu-head"></div>
      <div className="menu-body">
        <div className="host-from-menu">Host game</div>
        <div className="join-from-menu" onClick={clickStartRoom}>
          Join game
        </div>
      </div>
    </div>
  );
};
