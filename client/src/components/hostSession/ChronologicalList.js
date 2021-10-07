import React, { useState, useContext, useEffect } from "react";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

import {
  ListWrapper,
  List,
  ListItem,
  ListText,
  UpvoteCount,
} from "../shared/Lists";

/** 
* The list of questions provded by participants in chronological order. The list is 
rerendered every time the server proved updates.
*/

export const ChronologicalList = () => {
  const { newQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return newQuestions.map((questionInfo, index) => (
        <ListItem key={index}>
          <ListText>{questionInfo.question}</ListText>
          <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
        </ListItem>
      ));
    });
  }, [newQuestions]);

  return (
    <ListWrapper>
      <h2>New</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
