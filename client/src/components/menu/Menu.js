import React, { useContext, useEffect } from "react";
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

const Container = styled(FlexDivY)`
    height: 100vh;
    width: 100vw;
    justify-content: space-evenly;
    text-align: center;
`;

const Heading = styled.h1`
    margin-bottom: 60px;
    font-size: 3em;
`;

const HorizontalContainer = styled(FlexDivX)`
    height: 20%;
    width: 80%;
    margin: 0 10% 0 10%;
    justify-content: space-between;
`;

const JoinButton = styled(GridItem)`
    background-color: lightblue;
    border-radius: 20px;
    display: flex;
    width: 25vw;
    text-align: center;
    flex-direction: column;
    justify-content: center;
`;

const HostButton = styled(GridItem)`
    background-color: lightblue;
    border-radius: 20px;
    width: 25vw;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 40px;
`;

const InputArea = styled.textarea`
    width: 80%;
    margin: 0 auto;
    height: 4vh;
`;

export const Menu = () => {
    const { userContext, setUserContext } = useContext(SessionState);

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
        console.log(
            "connected from ",
            userContext["activeSocket"].id,
            possiblePin
        );
        userContext["activeSocket"].on("room-access", (pin) => {
            if (userContext["appContext"] === 0) {
                console.log("room access received", pin);
                setUserContext((prev) => {
                    console.log("previous usercontext: ", prev);
                    return { ...prev, roomPin: pin, appContext: 2 };
                });
            }
        });
    };

    const clickStartRoom = () => {
        console.log(userContext["activeSocket"].id);

        userContext["activeSocket"].emit(
            "host-start-session",
            userContext["activeSocket"].id
        );
        console.log("connected from ", userContext["activeSocket"].id);
        userContext["activeSocket"].on("room-pin", (pin) => {
            console.log("pin recieved from server: ", pin);
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
                    <h2>
                        Host <br />
                        lecture
                    </h2>
                </HostButton>
                <JoinButton>
                    <InputArea
                        placeholder="Add room pin"
                        id="room-pin-input"
                    ></InputArea>
                    <h2 onClick={clickJoinRoom}>Join lecture</h2>
                </JoinButton>
            </HorizontalContainer>
        </Container>
    );
};
