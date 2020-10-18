import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { SessionState } from "../../contexts/SessionState";

const TopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: lightblue;

  height: 10vh;
  width: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 1vh;
  overflow: hidden;
  width: 90%;
`;

const TimerBox = styled.div``;

const SessionPinBox = styled.div``;

const ParticipantBox = styled.div``;

/**
 * To
 */

export const NavBar = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);

  useEffect(() => {}, [userContext["roomPin"]]);
  useEffect(() => {
    userContext["activeSocket"].on(
      "viewercount-change",
      (num) => {
        console.log("participant", num);
        setNumberOfParticipants(num);
      },
      []
    );
  });
  return (
    <TopNav>
      <NavContainer>
        <TimerBox>Time</TimerBox>
        <SessionPinBox>
          Pin: <br /> {userContext["roomPin"]}
        </SessionPinBox>
        <ParticipantBox>
          Nr of participants: <br /> {numberOfParticipants}
        </ParticipantBox>
      </NavContainer>
    </TopNav>
  );
};
