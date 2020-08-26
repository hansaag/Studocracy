import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";

import { TopQuestionContext } from "../../contexts/TopQuestionContext";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";

const SessionWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const HostSession = () => {
  const NewQuestions = [
    { id: 14, question: "Jeg liker polser?" },
    { id: 12, question: "Jeg liker kebab?" },
  ];
  const TopQuestions = [
    { id: 15, question: "Jeg liker noobs?" },
    { id: 2, question: "Jeg liker kalver?" },
  ];
  const { userContext, setUserContext } = useContext(SessionState);
  const { activeSocket, setActiveSocket } = useContext(SocketInfo);
  const [newQuestions, setNewQuestions] = useState(NewQuestions);
  const [topQuestions, setTopQuestions] = useState(TopQuestions);

  return (
    <SessionWrapper>
      <NewQuestionContext.Provider value={{ newQuestions, setNewQuestions }}>
        <ChronologicalList />
      </NewQuestionContext.Provider>
      <TopQuestionContext.Provider value={{ topQuestions, setTopQuestions }}>
        <TopList />
      </TopQuestionContext.Provider>
    </SessionWrapper>
  );
};
