import React from "react";

import styled from "styled-components";

export const FlexDivX = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const FlexDivY = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 12, 1fr;
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  height: 96vh;
  width: 96%;
  margin: 1vh 1vw 1vh 1vw;
  overflow: hidden;
`;

export const TopNav = styled.nav`
  grid-column: 1/12;
  grid-row: 1;

  display: grid;
  grid-template-columns: 12, 1fr;
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 1% 1% 1% 1%;
  overflow: hidden;
`;

export const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 12, 1fr;
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  height: 96vh;
  width: 96%;
  margin: 1vh 1vw 1vh 1vw;
  overflow: hidden;
`;

export const GridItem = styled.div``;

export const CenteredFlexDiv = (content) => (
  <FlexDivX>
    <FlexDivY>{content}</FlexDivY>
  </FlexDivX>
);
