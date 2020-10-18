import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { SessionState } from "../../contexts/SessionState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: space-evenly;
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 60px;
  font-size: 3em;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 20%;
  width: 80%;
  margin: 0 10% 0 10%;
  justify-content: space-between;
`;

const JoinButton = styled.div`
  background-color: lightblue;
  border-radius: 20px;
  display: flex;
  width: 25vw;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

const HostButton = styled.div`
  background-color: lightblue;
  border-radius: 20px;
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const InputArea = styled.textarea`
  width: 80%;
  margin: 0 auto;
  height: 4vh;
`;

/**
 * Component with 2 primary actions: hosting a session, and joining a session.
 */

export const Menu = () => {
  const { userContext, setUserContext } = useContext(SessionState);

  userContext["activeSocket"].on("room-denied", () => {
    console.log("room access denied");
    //display error toast
  });

  const clickJoinRoom = () => {
    /**
     * Attempts to join a room as a participant
     * @summary Passes the socket id and the pin entered by the user to server for room access. If Access
     * is granted, the userContext is updated.
     * @return {JSX | error} Returns the session component if correct pin is provided and server responds.
     */

    const possiblePin = document.getElementById("room-pin-input").value;
    userContext["activeSocket"].emit(
      "guest-join-session",
      userContext["activeSocket"].id,
      possiblePin
    );

    userContext["activeSocket"].on("room-access", (pin) => {
      if (userContext["appContext"] === 0) {
        console.log("room access received", pin);
        setUserContext((prev) => {
          return { ...prev, roomPin: pin, appContext: 2 };
        });
      }
    });
  };

  const clickStartRoom = () => {
    /**
     * Attemps to start a new host session. And changes usercontext if server responds.
     * @return {JSX | error} Returns the host session component if server responds.
     */

    userContext["activeSocket"].emit(
      "host-start-session",
      userContext["activeSocket"].id
    );

    userContext["activeSocket"].on("room-pin", (pin) => {
      setUserContext((prev) => {
        return { ...prev, roomPin: pin, appContext: 1 };
      });
    });
  };

  return (
    <Container>
      <Heading>Studocracy</Heading>
      <HorizontalContainer>
        <HostButton onClick={clickStartRoom}>
          <h2>Host lecture</h2>
        </HostButton>
        <JoinButton>
          <InputArea placeholder="Add room pin" id="room-pin-input"></InputArea>
          <h2 onClick={clickJoinRoom}>Join lecture</h2>
        </JoinButton>
      </HorizontalContainer>
    </Container>
  );
};
