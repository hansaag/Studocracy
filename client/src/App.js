import React, { useEffect, useState, Fragment, useCallback } from "react";
import "./App.css";
import io from "socket.io-client";
import styled from "styled-components";
import { HostSession } from "./components/session/HostSession";
import { Menu } from "./components/menu/Menu";
import { ParticipantSession } from "./components/session/ParticipantSession";
import { PostSession } from "./components/postSession/PostSession";
import { SessionState } from "./contexts/SessionState";
import { FlexDivY } from "./components/styledUI/Conatainers";
import { ReloadComponent } from "./components/ReloadComponent";
import { socket } from "./components/service/socket";

// import {reload}
//placed above render method to prevent generating new cocket on rerender

//gartner: lag en div med fast størrelse til bildet...prøv grid senere

function App() {
  const [userContext, setUserContext] = useState({
    appContext: 0,
    roomPin: null,
    activeSocket: socket,
    serial: null,
  });

  socket.on("room-access", () => {
    console.log("room access received");
    setUserContext((prev) => {
      return { ...prev, appContext: 2 };
    });
  });

  const clickStartRoom = useCallback(() => {
    console.log(userContext["activeSocket"].id);
    if (userContext["activeSocket"] !== null) {
      userContext["activeSocket"].emit(
        "host-start-session",
        userContext["activeSocket"].id
      );
      console.log("connected from ", userContext["activeSocket"].id);
    }
    socket.on("room-pin", (pin) => {
      console.log("pin recieved from server: ", pin);
      setUserContext((prev) => {
        return { ...prev, roomPin: pin, appContext: 1 };
      });
    });
  });

  return (
    <SessionState.Provider value={{ userContext, setUserContext }}>
      <ReloadComponent startRoom={clickStartRoom} />
    </SessionState.Provider>
  );
}

export default App;

// import { createGlobalStyle } from "styled-components"
// const GlobalStyles = createGlobalStyle\`
// *{
// box-sizing: border-box;
// }
