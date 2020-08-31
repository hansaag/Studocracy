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
  background-color: lightblue;
`;

const HostButton = styled(GridItem)`
  grid-column: 2/3;
  grid-row: 2;
`;

const Footer = styled(FlexDivX)`
  grid-column: 1/12;
  grid-row: 6;
`;

const InputArea = styled.textarea`
  width: 80%;
  height: 4vh;
`;

export const Menu = ({ startRoom }) => {
  const { userContext, setUserContext } = useContext(SessionState);
  const dummyConnect = "1234";

  userContext["activeSocket"].on("room-denied", () => {
    console.log("room access denied");
    //display error toast
  });

  const clickJoinRoom = () => {
    const possiblePin = document.getElementById("room-pin-input").value;
    userContext["activeSocket"].emit(
      "guest-join-session",
      userContext["activeSocket"].id,
      possiblePin
    );
    console.log("connected from ", userContext["activeSocket"].id, possiblePin);
  };

  return (
    <GridDiv>
      <TopNav>Header</TopNav>

      <HostButton onClick={startRoom}>
        <h2>Host game</h2>
      </HostButton>
      <JoinButton>
        <InputArea placeholder="Add room pin" id="room-pin-input"></InputArea>
        <h2 onClick={clickJoinRoom}>Join game</h2>
      </JoinButton>
      <Footer></Footer>
    </GridDiv>
  );
};
