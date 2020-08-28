import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

import { TopQuestionContext } from "../../contexts/TopQuestionContext";
import { SessionState } from "../../contexts/SessionState";

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
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
  const { topQuestions, setTopQuestions } = useContext(TopQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return topQuestions.map((questionInfo, index) => (
        <ListItem key={index}>
          <ListText>{questionInfo.question}</ListText>
        </ListItem>
      ));
    });
    console.log(topQuestions);
  }, [topQuestions]);

  return (
    <ListWrapper>
      <h2>Høyest rangert</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
