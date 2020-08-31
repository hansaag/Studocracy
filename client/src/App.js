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

  useEffect(() => {
    console.log("user context from reload comp: ", userContext["appContext"]);
  }, [userContext["appContext"]]);

  useEffect(() => {
    userContext["activeSocket"].on("room-pin", (pin) => {
      console.log("pin recieved from server: ", pin);
      setUserContext((prev) => {
        return { ...prev, roomPin: pin, appContext: 1 };
      });
    });
  }, []);

  useEffect(() => {
    userContext["activeSocket"].on("room-access", (pin) => {
      if (userContext["appContext"] === 0) {
        console.log("room access received", pin);
        const intPin = parseInt(pin);
        setUserContext((prev) => {
          return { ...prev, roomPin: intPin, appContext: 2 };
        });
      }
    });
  });

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
