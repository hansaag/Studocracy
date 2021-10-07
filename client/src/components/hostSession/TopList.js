import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

const ListWrapper = styled.div`
  display: flex;
  max-height: 65vh;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;

`;

const List = styled.div`
  margin: 0 auto;
  overflow-y: scroll;
  width: 40vw;
`;

const ListItem = styled.li`
  margin: 15px;
  width: 90%;
  text-align: left;
  background-color: lightblue;
  border-radius: 20px;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

const ListText = styled.p`
  padding: 10px;
  word-break: break-all;
`;

const UpvoteCount = styled.h4`
  margin-right: 15px;
`;

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
