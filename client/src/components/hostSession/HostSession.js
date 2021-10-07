import React, { useState, useContext, useEffect, useCallback } from "react";
import { SessionState } from "../../contexts/SessionState";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";
import { NavBar } from "../NavBar";
import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";

import {
  Container,
  GridDiv,
  TopQuestionDiv,
  NewQuestionsDiv,
  InputWrapper,
} from "../shared/TopLevel";

/**
 * The main component for an ongoing host session. Returns two lists and an input area for voting rounds.
 * The lists update through the useeffect where client recieves an updated question list from server.
 */

export const HostSession = () => {
  const { userContext } = useContext(SessionState);
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

  /* When the host socket receives update questions event, reload the 
    component with the received questions */
  useEffect(() => {
    if (userContext["appContext"] === 1) {
      userContext["activeSocket"].on("update-questions", (questions) => {
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
