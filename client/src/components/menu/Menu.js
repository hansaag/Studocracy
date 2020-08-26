import React, { useContext } from "react";
import io from "socket.io-client";
import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";
import { FlexDivX, FlexDivY, GridDiv, GridItem } from "../styledUI/Conatainers";
import styled from "styled-components";

import { gridCSS } from "../styledUI/CSS";

const Header = styled(GridItem)`
  grid-column: 1/5;
  grid-row: 1;
  text-align: center;
`;

const JoinButton = styled(GridItem)`
  grid-column: 5;
  grid-row: 3;
`;

const HostButton = styled(GridItem)`
  grid-column: 1;
  grid-row: 3;
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
      <Header>Header</Header>

      <HostButton>Host game</HostButton>
      <JoinButton onClick={clickStartRoom}>Join game</JoinButton>
    </GridDiv>
  );
};
