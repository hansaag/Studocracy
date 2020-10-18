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
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

import { NavBar } from "../../navigationBar/NavBar";
import { VotingPopup } from "./TopList";
import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";

const TopQuestionDiv = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

const NewQuestionsDiv = styled.div`
  grid-column: 2;
  grid-row: 1/2;
`;

const InputWrapper = styled.div`
  grid-column: 1;
  grid-row: 2;
  margin: 0 0 15px 10px;
`;

export const ParticipantSession = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const [newQuestions, setNewQuestions] = useState([]);

  const registerQuestion = useCallback((question) => {
    console.log("question sent!");
    userContext["activeSocket"].emit("question-sent", {
      user: userContext["activeSocket"].id,
      question: question,
      room: userContext["roomPin"],
    });
  });

  const upVoteQuestion = useCallback((question) => {
    console.log("question UPVOTED: ", question);
    userContext["activeSocket"].emit("upvote-sent", question);
  });

  const startVote = () => {
    console.log("vote started");
  };

  useEffect(() => {
    if (userContext["appContext"] === 2) {
      userContext["activeSocket"].on("update-questions", (questions) => {
        console.log("participant", questions);
        setNewQuestions(questions);
      });

      userContext["activeSocket"].on("start-votinground", (vote) => {
        console.log("participant", vote);
        startVote(vote);
      });
    }
  }, []);

  return (
    <FlexDivY>
      <NavBar />
      <GridDiv>
        <NewQuestionContext.Provider value={{ newQuestions, setNewQuestions }}>
          <NewQuestionsDiv>
            <ChronologicalList upvote={upVoteQuestion} />
          </NewQuestionsDiv>
          <TopQuestionDiv>
            <TopList upvote={upVoteQuestion} />
          </TopQuestionDiv>
        </NewQuestionContext.Provider>
        <InputWrapper>
          <QuestionForm submit={registerQuestion} />
        </InputWrapper>
      </GridDiv>
    </FlexDivY>
  );
};
