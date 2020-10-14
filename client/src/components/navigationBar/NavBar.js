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

const TimerBox = styled.div``;

const SessionPinBox = styled.div``;

const ParticipantBox = styled.div``;

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
