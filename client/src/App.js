import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import io from "socket.io-client";
import { HostSession } from "./components/session/HostSession";
import { Menu } from "./components/menu/Menu";
import { ParticipantSession } from "./components/session/ParticipantSession";
import { PostSession } from "./components/postSession/PostSession";
import { SessionState } from "./contexts/SessionState";
import { SocketInfo } from "./contexts/SocketInfo";

function App() {
  const [userContext, setUserContext] = useState(0);
  const [socketContext, setSocketContext] = useState(null);

  useEffect(() => {}, [userContext]);

  return (
    <SocketInfo.Provider value={{ socketContext, setSocketContext }}>
      <SessionState.Provider value={{ userContext, setUserContext }}>
        <div>
          {userContext === 0 && <Menu />}
          {userContext === 1 && <HostSession />}
          {userContext === 2 && <ParticipantSession />}
          {userContext === 3 && <PostSession />}
        </div>
      </SessionState.Provider>
    </SocketInfo.Provider>
  );
}

export default App;
