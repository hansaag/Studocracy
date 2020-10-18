import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import { SessionState } from "../../../contexts/SessionState";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

import { NavBar } from "../../navigationBar/NavBar";
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
  grid-template-rows: 68vh 22vh;

  grid-gap: 10px;
  min-height: 90vh;
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
 * The main component for an ongoing host session. Returns two lists and an input area for voting rounds.
 * The lists update through the useeffect where client recieves an updated question list from server.
 */

export const HostSession = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const [newQuestions, setNewQuestions] = useState([]);

  const registerVote = useCallback((question) => {
    /**
     * A callback function that lets the host start a voting round from child component.
     * @summary The values provided in the question form are sent to the server to broadcast to all participants.
     * @param {vote Object} question - A question and a range of alternatives that participants can answer.
     */

    console.log("vote submitted");
    userContext["activeSocket"].emit("votinground-sent", {
      user: userContext["activeSocket"].id,
      question: question,
      room: userContext["roomPin"],
    });
  });

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
    <Container>
      <NavBar />
      <GridDiv>
        <NewQuestionContext.Provider value={{ newQuestions, setNewQuestions }}>
          <NewQuestionsDiv>
            <ChronologicalList />
          </NewQuestionsDiv>
          <TopQuestionDiv>
            <TopList />
          </TopQuestionDiv>
        </NewQuestionContext.Provider>
        <InputWrapper>
          <QuestionForm startVote={registerVote} />
        </InputWrapper>
      </GridDiv>
    </Container>
  );
};
