import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  FlexDivX,
  FlexDivY,
  GridDiv,
  GridItem,
  TopNav,
} from "../../styledUI/Conatainers";

import { SessionState } from "../../../contexts/SessionState";

import { TopQuestionContext } from "../../../contexts/TopQuestionContext";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";
import { NavBar } from "../../navigationBar/NavBar";

const TopQuestionDiv = styled.div`
  grid-column: 1/5;
  grid-row 1/5;
`;

const NewQuestionsDiv = styled.div`
  grid-column: 6/12;
  grid-row 1/5;
`;

const InputWrapper = styled.div`
grid-column: 1/12;
grid-row 6/7;
margin-bottom: 10px;

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
  const [newQuestions, setNewQuestions] = useState(NewQuestions);
  const [topQuestions, setTopQuestions] = useState(TopQuestions);

  useEffect(() => {
    if (userContext["appContext"] === 1) {
      console.log("USER CONTEXT: ", userContext["appContext"]);
      userContext["activeSocket"].on("update-questions", (questions) => {
        console.log("host", questions);
        setNewQuestions(questions);
      });
    }
  }, []);

  return (
    <FlexDivY>
      <NavBar />
      <GridDiv>
        <NewQuestionsDiv>
          <NewQuestionContext.Provider
            value={{ newQuestions, setNewQuestions }}
          >
            <ChronologicalList />
          </NewQuestionContext.Provider>
        </NewQuestionsDiv>
        <TopQuestionDiv>
          <TopQuestionContext.Provider
            value={{ topQuestions, setTopQuestions }}
          >
            <TopList />
          </TopQuestionContext.Provider>
        </TopQuestionDiv>
        <InputWrapper>
          <QuestionForm />
        </InputWrapper>
      </GridDiv>
    </FlexDivY>
  );
};
