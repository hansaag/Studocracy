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
  const [userContext, setUserContext] = useState({
    appContext: 0,
    roomPin: null,
    activeSocket: sock,
    serial: null,
  });

  userContext["activeSocket"].on("room-pin", (pin) => {
    console.log("pin recieved from server: ", pin);
    setUserContext((prev) => {
      return { ...prev, roomPin: pin };
    });
  });

  userContext["activeSocket"].on("room-access", () => {
    console.log("room access received");
    setUserContext((prev) => {
      return { ...prev, appContext: 2 };
    });
  });

  useEffect(() => {
    console.log(userContext["appContext"]);
  }, [userContext["appContext"]]);

  return (
    <SessionState.Provider value={{ userContext, setUserContext }}>
      {userContext["appContext"] === 0 && <Menu />}
      {userContext["appContext"] === 1 && <HostSession />}
      {userContext["appContext"] === 2 && <ParticipantSession />}
      {userContext["appContext"] === 3 && <PostSession />}
    </SessionState.Provider>
  );
}

export default App;

// import { createGlobalStyle } from "styled-components"
// const GlobalStyles = createGlobalStyle\`
// *{
// box-sizing: border-box;
// }
