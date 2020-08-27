import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  FlexDivX,
  FlexDivY,
  GridDiv,
  GridItem,
  TopNav,
} from "../styledUI/Conatainers";

import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";

const Timer = styled.div``;

export const NavBar = () => {
  return <TopNav>Hei</TopNav>;
};
