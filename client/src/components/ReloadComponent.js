import React, { useEffect, useState, Fragment, useContext } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { HostSession } from "../components/session/HostSession";
import { Menu } from "../components/menu/Menu";
import { ParticipantSession } from "../components/session/ParticipantSession";
import { PostSession } from "../components/postSession/PostSession";
import { SessionState } from "../contexts/SessionState";
import { FlexDivY } from "../components/styledUI/Conatainers";

export const ReloadComponent = () => {
  const { userContext, setUserContext } = useContext(SessionState);

  useEffect(() => {
    console.log(userContext["appContext"]);
  }, [userContext["appContext"]]);

  return (
    <FlexDivY>
      {userContext["appContext"] === 0 && <Menu />}
      {userContext["appContext"] === 1 && <HostSession />}
      {userContext["appContext"] === 2 && <ParticipantSession />}
      {userContext["appContext"] === 3 && <PostSession />}
    </FlexDivY>
  );
};
