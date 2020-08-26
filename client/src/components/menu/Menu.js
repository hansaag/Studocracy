import React, { useContext } from "react";
import io from "socket.io-client";
import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";

export const Menu = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const { activeSocket, setActiveSocket } = useContext(SocketInfo);

  const dummyConnect = "1234";

  activeSocket.on("room-access", () => {
    console.log("room access received");
    setUserContext(2);
  });

  activeSocket.on("room-denied", () => {
    console.log("room access denied");
    //display error toast
  });

  const clickStartRoom = () => {
    console.log(activeSocket.id);
    if (activeSocket !== null) {
      activeSocket.emit("host-start-session", activeSocket.id);
      console.log("connected from ", activeSocket.id);
    }
    setUserContext(1);
  };

  const clickJoinRoom = () => {
    if (activeSocket !== null) {
      activeSocket.emit("guest-join-session", activeSocket.id, dummyConnect);
      console.log("connected from ", activeSocket.id, dummyConnect);
    }
  };

  return (
    <div className="Menu-container">
      <div className="menu-head"></div>
      <div className="menu-body">
        <div className="host-from-menu" onClick={clickJoinRoom}>
          Host game
        </div>
        <div className="join-from-menu" onClick={clickStartRoom}>
          Join game
        </div>
      </div>
    </div>
  );
};
