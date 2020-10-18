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

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: minmax(auto, 70vh) 110px;
  grid-gap: 10px;
  height: 90vh;
  width: 98%;
  margin: 0 1% 0 1%;
  overflow: scroll;
`;

export const TopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: lightblue;

  height: 10vh;
  width: 100%;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 1vh;
  overflow: hidden;
  width: 90%;
`;

export const GridItem = styled.div``;

export const CenteredFlexDiv = (content) => (
  <FlexDivX>
    <FlexDivY>{content}</FlexDivY>
  </FlexDivX>
);
