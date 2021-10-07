import React, { useState, useContext, useEffect } from "react";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

import {
  ListWrapper,
  List,
  ListItem,
  ListText,
  UpvoteContainer,
  Upvote,
  UpvoteCount,
  UpvoteWrapper,
} from "../shared/Lists";

/** 
* The list of questions provded by participants in chronological order. The list is 
rerendered every time the server provides updates.
*/

export const ChronologicalList = ({ upvote, upvotedQuestions }) => {
  const { newQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return newQuestions.map((questionInfo, index) => {
        let highlighted = false;
        if (upvotedQuestions.upvoteIDs.includes(questionInfo.question_serial)) {
          highlighted = true;
        }
        return (
          <ListItem key={index}>
            <ListText>{questionInfo.question}</ListText>
            <UpvoteContainer>
              <UpvoteWrapper>
                <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
                <Upvote
                  onClick={() => upvote(questionInfo)}
                  highlighted={highlighted}
                >
                  <i className="fas fa-long-arrow-alt-up" id="upvote"></i>
                </Upvote>
              </UpvoteWrapper>
            </UpvoteContainer>
          </ListItem>
        );
      });
    });
  }, [newQuestions]);

  return (
    <ListWrapper>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.0/css/all.css"
        integrity="sha384-aOkxzJ5uQz7WBObEZcHvV5JvRW3TUc2rNPA7pe3AwnsUohiw1Vj2Rgx2KSOkF5+h"
        crossOrigin="anonymous"
      ></link>
      <h2>New</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
