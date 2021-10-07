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
* The list of questions provded by participants in top-rated order. The list is 
rerendered on changes to the new question list.
*/

export const TopList = () => {
  const { newQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      let topRated = newQuestions.sort((a, b) => b["upvotes"] - a["upvotes"]);
      return topRated.slice(0, 5).map((questionInfo, index) => (
        <ListItem key={index}>
          <ListText>{questionInfo.question}</ListText>
          <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
        </ListItem>
      ));
    });
  }, [newQuestions]);

  return (
    <ListWrapper>
      <h2>Highest rated</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
