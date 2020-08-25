import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:6800");
function App() {
  useEffect(() => {
    socket.on("new-operations");
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>LOL</p>
      </header>
    </div>
  );
}

export default App;
