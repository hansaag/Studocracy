import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import io from "socket.io-client";
import styled from "styled-components";

import { HostSession } from "./components/session/HostSession";
import { Menu } from "./components/menu/Menu";
import { ParticipantSession } from "./components/session/ParticipantSession";
import { PostSession } from "./components/postSession/PostSession";
import { SessionState } from "./contexts/SessionState";
import { SocketInfo } from "./contexts/SocketInfo";
import { RoomPinContext } from "./contexts/RoomPinContext";

//placed above render method to prevent generating new cocket on rerender
const sock = io("http://localhost:6800");

//gartner: lag en div med fast størrelse til bildet...prøv grid senere

function App() {
  const [userContext, setUserContext] = useState(0);
  const [roomPin, setRoomPin] = useState(null);
  const [activeSocket, setActiveSocket] = useState(sock);

  activeSocket.on("room-pin", (pin) => {
    console.log("pin recieved from server: ", pin);
    setRoomPin(pin);
  });

  useEffect(() => {}, [userContext]);

  return (
    <SocketInfo.Provider value={{ activeSocket, setActiveSocket }}>
      <SessionState.Provider value={{ userContext, setUserContext }}>
        <RoomPinContext.Provider value={{ roomPin, setRoomPin }}>
          {userContext === 0 && <Menu />}
          {userContext === 1 && <HostSession />}
          {userContext === 2 && <ParticipantSession />}
          {userContext === 3 && <PostSession />}
        </RoomPinContext.Provider>
      </SessionState.Provider>
    </SocketInfo.Provider>
  );
}

export default App;

// import { createGlobalStyle } from "styled-components"
// const GlobalStyles = createGlobalStyle\`
// *{
// box-sizing: border-box;
// }
