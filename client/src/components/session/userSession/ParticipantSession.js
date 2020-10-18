import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import { SessionState } from "../../../contexts/SessionState";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

import { NavBar } from "../../navigationBar/NavBar";
import { VotingPopup } from "./TopList";
import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const GridDiv = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: minmax(auto, 70vh) 110px;
  grid-gap: 10px;
  height: 90vh;
  width: 98%;
  margin: 0 1% 0 1%;
  overflow: scroll;
`;

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

/**
 * The main component for an ongoing participant session. Returns two lists and an input area for asking questions.
 * The lists update through the useeffect where client recieves an updated question list from server.
 * There is also a useeffect that tracks voting rounds initated by host
 */

export const ParticipantSession = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const [newQuestions, setNewQuestions] = useState([]);

  const registerQuestion = useCallback((question) => {
    /**
     * A callback function that lets the user ask a question from child component.
     * @summary The input in the question form is sent to the server to broadcast to all participants.
     * @param {string} question - The question provided by user
     */

    document.getElementById("input-question").value = "";
    userContext["activeSocket"].emit("question-sent", {
      user: userContext["activeSocket"].id,
      question: question,
      room: userContext["roomPin"],
    });
  });

  const upVoteQuestion = useCallback((question) => {
    /**
     * A callback function that lets the user upvote a question from on of the lists.
     * @param {question object} question - The upvoted question sent to server for processing
     */

    userContext["activeSocket"].emit("upvote-sent", question);
  });

  const startVote = () => {
    //render popup
    console.log("vote started");
  };

  useEffect(() => {
    if (userContext["appContext"] === 2) {
      userContext["activeSocket"].on("update-questions", (questions) => {
        setNewQuestions(questions);
      });

      userContext["activeSocket"].on("start-votinground", (vote) => {
        startVote(vote);
      });
    }
  }, []);

  return (
    <Container>
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
    </Container>
  );
};
