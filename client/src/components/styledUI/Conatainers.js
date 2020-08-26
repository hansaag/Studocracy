import React from "react";

import styled from "styled-components";
import { css } from "styled-components";
import { gridCSS } from "./CSS";

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
  ${gridCSS}
  height: 100%;
  width: 100%;
`;

export const GridItem = styled.div``;

export const CenteredFlexDiv = (content) => (
  <FlexDivX>
    <FlexDivY>{content}</FlexDivY>
  </FlexDivX>
);
