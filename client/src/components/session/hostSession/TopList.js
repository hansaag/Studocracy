import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";
import { SessionState } from "../../../contexts/SessionState";

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  max-height: 65vh;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;

  & h2 {
    color: ;
  }
`;

const List = styled.div`
  overflow-y: scroll;
`;

const ListItem = styled.li`
  margin: 15px;
  text-align: left;
  background-color: lightblue;
  border-radius: 20px;
  list-style: none;
`;

const ListText = styled.p`
  margin-left: 10px;
`;

export const TopList = () => {
  const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      let topRated = newQuestions.sort((a, b) => b["upvotes"] - a["upvotes"]);
      return topRated.map((questionInfo, index) => (
        <ListItem key={index}>
          <ListText>{questionInfo.question}</ListText>
        </ListItem>
      ));
    });
  }, [newQuestions]);

  return (
    <ListWrapper>
      <h2>Høyest rangert</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
