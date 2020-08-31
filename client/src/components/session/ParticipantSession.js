import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  FlexDivX,
  FlexDivY,
  GridDiv,
  GridItem,
  TopNav,
} from "../styledUI/Conatainers";

import { SessionState } from "../../contexts/SessionState";

import { TopQuestionContext } from "../../contexts/TopQuestionContext";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";
import { NavBar } from "../navigationBar/NavBar";

const TopQuestionDiv = styled.div`
  grid-column: 1/5;
  grid-row 2/4;
`;

const NewQuestionsDiv = styled.div`
  grid-column: 6/12;
  grid-row 2/4;
`;

const InputWrapper = styled.div`
grid-column: 1/12;
grid-row 5/6;
`;

export const ParticipantSession = () => {
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

  const registerQuestion = useCallback((question) => {
    console.log("question submitted: ", question);
    console.log({
      user: userContext["activeSocket"].id,
      question: question,
      room: userContext["roomPin"],
    });
    userContext["activeSocket"].emit("question-sent", {
      user: userContext["activeSocket"].id,
      question: question,
      room: userContext["roomPin"],
    });
    userContext["activeSocket"].on("update-questions", (questions) => {
      console.log(questions);
      setNewQuestions(questions);
    });
  });

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
          <QuestionForm submit={registerQuestion} />
        </InputWrapper>
      </GridDiv>
    </FlexDivY>
  );
};
