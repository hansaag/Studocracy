import React from "react";

import styled from "styled-components";

export const FlexDivX = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
`;

export const FlexDivY = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    height: 100%;
    justify-content: center;
`;

export const GridDiv = styled.div`
    display: grid;
    grid-template-columns: 12, 1fr;
    grid-auto-rows: auto 120px;
    grid-gap: 10px;
    height: 90vh;
    width: 98%;
    margin: 0 1% 10px 1%;
    overflow: scroll;
`;

export const TopNav = styled.nav`
    grid-column: 1/12;
    grid-row: 1;
    background-color: lightblue;

    height: 10vh;
    width: 100%;
`;

export const NavContainer = styled.div`
    display: grid;
    grid-template-columns: 12, 1fr;
    grid-gap: 10px;
    grid-auto-rows: minmax(70px, auto);
    margin: 1vh 1vw 1vh 1vw;
    overflow: hidden;
`;

export const GridItem = styled.div``;

export const CenteredFlexDiv = (content) => (
    <FlexDivX>
        <FlexDivY>{content}</FlexDivY>
    </FlexDivX>
);
