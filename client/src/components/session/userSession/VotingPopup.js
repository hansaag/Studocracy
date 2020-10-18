import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";
import { SessionState } from "../../../contexts/SessionState";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const VoteModal = styled.modal``;

/**
 * This component will act as a popup to show voting rounds initiated by the host, and allow
 * the user to choose from a set of options No implementation yet, but correctly recieves the data from server.
 */

export const VotingPopup = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const [activeVote, setActiveVote] = useState(false);

  useEffect(() => {
    userContext["activeSocket"].on(
      "votinground-sent",
      (info) => {
        console.log("participant", info);
        setActiveVote(info);
      },
      []
    );
  });

  if (activeVote == false) {
    return <div></div>;
  } else {
    return <div></div>;
  }
};
