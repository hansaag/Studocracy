import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

export const GridView = styled.div``;

export const gridCSS = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;
