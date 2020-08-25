import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import {
  HostSession,
  Menu,
  ParticipantSession,
  PostSession,
} from "./components";

const socket = io("http://localhost:6800");

function App() {
  const [userContext, setUserContext] = useState(0);

  useEffect(() => {
    socket.on("new-operations");
  }, []);

  switch (userContext) {
    case 1:
      return <HostSession />;
      break;

    case 2:
      return <ParticipantSession />;
      break;

    case 3:
      return <PostSession />;
      break;

    default:
      return <Menu />;
  }
}

export default App;
