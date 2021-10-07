import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
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
