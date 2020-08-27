import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  FlexDivX,
  FlexDivY,
  GridDiv,
  GridItem,
  TopNav,
  NavContainer,
} from "../styledUI/Conatainers";

import { SocketInfo } from "../../contexts/SocketInfo";
import { RoomPinContext } from "../../contexts/RoomPinContext";

const TimerBox = styled.div`
  grid-column: 1/2;
  grid-row: 1;
`;

const SessionPinBox = styled.div`
  grid-column: 5/6;
  grid-row: 1;
`;

const ParticipantBox = styled.div`
  grid-column: 10/11;
  grid-row: 1;
`;

export const NavBar = () => {
  const { activeSocket, setActiveSocket } = useContext(SocketInfo);
  const { roomPin, setRoomPin } = useContext(RoomPinContext);

  useEffect(() => {}, [roomPin]);

  return (
    <TopNav>
      <NavContainer>
        <TimerBox>Time</TimerBox>
        <SessionPinBox>
          Pin: <br /> {activeSocket.roomPin}
        </SessionPinBox>
        <ParticipantBox>Nr of participants</ParticipantBox>
      </NavContainer>
    </TopNav>
  );
};
