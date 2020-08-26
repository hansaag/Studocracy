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

//placed above render method to prevent generating new cocket on rerender
const sock = io("http://localhost:6800");

function App() {
  const [userContext, setUserContext] = useState(0);

  const [activeSocket, setActiveSocket] = useState(sock);

  useEffect(() => {}, [userContext]);

  return (
    <SocketInfo.Provider value={{ activeSocket, setActiveSocket }}>
      <SessionState.Provider value={{ userContext, setUserContext }}>
        {userContext === 0 && <Menu />}
        {userContext === 1 && <HostSession />}
        {userContext === 2 && <ParticipantSession />}
        {userContext === 3 && <PostSession />}
      </SessionState.Provider>
    </SocketInfo.Provider>
  );
}

export default App;
