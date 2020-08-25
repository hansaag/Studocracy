import React, { useEffect, useState } from "react";
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

  switch (userContext) {
    case 1:
      return <HostSession />;

    case 2:
      return <ParticipantSession />;

    case 3:
      return <PostSession />;

    default:
      return <Menu />;
  }
}

export default App;
