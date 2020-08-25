import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { HostSession } from "./components/HostSession";
import { Menu } from "./components/Menu";
import { ParticipantSession } from "./components/ParticipantSession";
import { PostSession } from "./components/PostSession";

const socket = io("http://localhost:6800");

function App() {
  const [userContext, setUserContext] = useState(0);

  useEffect(() => {
    socket.on("new-operations");
  }, []);

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
d;
export default App;
