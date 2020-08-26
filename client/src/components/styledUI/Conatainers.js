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
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  height: 100vh;
  width: 100%;
`;

export const GridItem = styled.div``;

export const CenteredFlexDiv = (content) => (
  <FlexDivX>
    <FlexDivY>{content}</FlexDivY>
  </FlexDivX>
);
