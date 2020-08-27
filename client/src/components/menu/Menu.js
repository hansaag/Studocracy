import React, { useContext } from "react";
import io from "socket.io-client";
import styled from "styled-components";

import { NavBar } from "../navigationBar/NavBar";

import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";
import {
  FlexDivX,
  FlexDivY,
  GridDiv,
  GridItem,
  TopNav,
} from "../styledUI/Conatainers";

const Header = styled(GridItem)`
  grid-column: 1/12;
  grid-row: 1/2;
  text-align: center;
`;

const JoinButton = styled(GridItem)`
  grid-column: 10/11;
  grid-row: 2;
`;

const HostButton = styled(GridItem)`
  grid-column: 2/3;
  grid-row: 2;
`;

export const Menu = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const { activeSocket, setActiveSocket } = useContext(SocketInfo);
  const dummyConnect = "1234";

  activeSocket.on("room-access", () => {
    console.log("room access received");
    setUserContext(2);
  });

  activeSocket.on("room-denied", () => {
    console.log("room access denied");
    //display error toast
  });

  const clickStartRoom = () => {
    console.log(activeSocket.id);
    if (activeSocket !== null) {
      activeSocket.emit("host-start-session", activeSocket.id);
      console.log("connected from ", activeSocket.id);
    }
    setUserContext(1);
  };

  const clickJoinRoom = () => {
    if (activeSocket !== null) {
      activeSocket.emit("guest-join-session", activeSocket.id, dummyConnect);
      console.log("connected from ", activeSocket.id, dummyConnect);
    }
  };

  return (
    <GridDiv>
      <TopNav>Header</TopNav>

      <HostButton onClick={clickStartRoom}>Host game</HostButton>
      <JoinButton onClick={clickJoinRoom}>Join game</JoinButton>
    </GridDiv>
  );
};
