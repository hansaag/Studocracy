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
  const dummyConnect = "1234";

  userContext["activeSocket"].on("room-denied", () => {
    console.log("room access denied");
    //display error toast
  });

  const clickStartRoom = () => {
    console.log(userContext["activeSocket"].id);
    if (userContext["activeSocket"] !== null) {
      userContext["activeSocket"].emit(
        "host-start-session",
        userContext["activeSocket"].id
      );
      console.log("connected from ", userContext["activeSocket"].id);
    }
    setUserContext((prev) => {
      return { ...prev, appContext: 1 };
    });
  };

  const clickJoinRoom = () => {
    if (userContext["activeSocket"] !== null) {
      userContext["activeSocket"].emit(
        "guest-join-session",
        userContext["activeSocket"].id,
        dummyConnect
      );
      console.log(
        "connected from ",
        userContext["activeSocket"].id,
        dummyConnect
      );
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
