import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { SocketInfo } from "../../contexts/SocketInfo";
import { SessionState } from "../../contexts/SessionState";

import { TopQuestionContext } from "../../contexts/TopQuestionContext";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";

const SessionWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  max-width: 800px;
  margin: 0 auto;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HostSession = () => {
  const NewQuestions = [
    { id: 14, question: "Jeg liker polser?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
    { id: 12, question: "Jeg liker kebab?" },
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
      <ListContainer>
        <NewQuestionContext.Provider value={{ newQuestions, setNewQuestions }}>
          <ChronologicalList />
        </NewQuestionContext.Provider>
        <TopQuestionContext.Provider value={{ topQuestions, setTopQuestions }}>
          <TopList />
        </TopQuestionContext.Provider>
      </ListContainer>
      <QuestionForm />
    </SessionWrapper>
  );
};
