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

import { SessionState } from "../../contexts/SessionState";

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
  const { userContext, setUserContext } = useContext(SessionState);

  useEffect(() => {}, [userContext["roomPin"]]);

  return (
    <TopNav>
      <NavContainer>
        <TimerBox>Time</TimerBox>
        <SessionPinBox>
          Pin: <br /> {userContext["roomPin"]}
        </SessionPinBox>
        <ParticipantBox>Nr of participants</ParticipantBox>
      </NavContainer>
    </TopNav>
  );
};
