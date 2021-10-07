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
 * The main component for an ongoing participant session. Returns two lists and an input area for asking questions.
 * The lists update through the useeffect where client recieves an updated question list from server.
 * There is also a useeffect that tracks voting rounds initated by host
 */

export const ParticipantSession = () => {
  const { userContext, setUserContext } = useContext(SessionState);
  const [newQuestions, setNewQuestions] = useState([]);
  const [upvotedQuestions, setUpvotedQuestions] = useState({
    upvoteIDs: [],
  });

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
     * @summary The function checks if the ID is already upvoted from this client using the state array,
     * and if not, sends the upvote event to the server and adds the question ID to the state array.
     * @param {question object} question - The upvoted question sent to server for processing
     */
    let upvoteID = question.question_serial;
    if (upvotedQuestions.upvoteIDs.includes(upvoteID)) {
      return null;
    }
    setUpvotedQuestions((prev) => {
      return { upvoteIDs: [...prev.upvoteIDs, upvoteID] };
    });
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
            <ChronologicalList
              upvote={upVoteQuestion}
              upvotedQuestions={upvotedQuestions}
            />
          </NewQuestionsDiv>
          <TopQuestionDiv>
            <TopList
              upvote={upVoteQuestion}
              upvotedQuestions={upvotedQuestions}
            />
          </TopQuestionDiv>
        </NewQuestionContext.Provider>
        <InputWrapper>
          <QuestionForm submit={registerQuestion} />
        </InputWrapper>
      </GridDiv>
    </Container>
  );
};
