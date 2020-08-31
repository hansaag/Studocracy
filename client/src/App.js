import React, { useEffect, useState, Fragment, useCallback } from "react";
import "./App.css";
import io from "socket.io-client";
import styled from "styled-components";
import { HostSession } from "./components/session/hostSession/HostSession";
import { Menu } from "./components/menu/Menu";
import { ParticipantSession } from "./components/session/userSession/ParticipantSession";
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
  });

  useEffect(() => {
    console.log("user context from reload app: ", userContext);
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

// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

// const io = require('socket.io-client');
// const socket = io('http://localhost:3011');

// function App() {

//   const [messageCount, setMessageCount] = useState(0);
//   const [theme, setTheme] = useState('dark');
//   const [inRoom, setInRoom] = useState(false);

//    useEffect(() => {

//     if(inRoom) {
//       console.log('joining room');
//       socket.emit('room', {room: 'test-room'});
//     }

//     return () => {
//       if(inRoom) {
//         console.log('leaving room');
//         socket.emit('leave room', {
//           room: 'test-room'
//         })
//       }
//     }
//   });

//   useEffect(() => {
//     socket.on('receive message', payload => {
//       setMessageCount(messageCount + 1);
//       document.title = `${messageCount} new messages have been emitted`;
//     });
//   }, []); //only re-run the effect if new message comes in

//   const handleSetTheme = () => {
//     let newTheme;
//     (theme === 'light')
//       ? newTheme = 'dark'
//       : newTheme = 'light';
//     console.log('new theme: ' + newTheme);
//     setTheme(newTheme);
//   }

//   const handleInRoom = () => {
//     inRoom
//       ? setInRoom(false)
//       : setInRoom(true);
//   }

//   const handleNewMessage = () => {
//     console.log('emitting new message');
//     socket.emit('new message', {
//       room: 'test-room'
//     });
//     setMessageCount(messageCount + 1);
//   }

//   return (
//     <div className={`App Theme-${theme}`}>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />

//         <h1>
//           {inRoom && `You Have Entered The Room` }
//           {!inRoom && `Outside Room` }
//         </h1>

//         <p>{messageCount} messages have been emitted</p>

//         {inRoom &&
//         <button onClick={() => handleNewMessage()}>
//           Emit new message
//         </button>
//         }

//         <button onClick={() => handleSetTheme()}>
//           Toggle Theme
//         </button>

//         <button onClick={() => handleInRoom()}>
//           {inRoom && `Leave Room` }
//           {!inRoom && `Enter Room` }
//         </button>

//       </header>
//     </div>
//   );
// }

// export default App;
