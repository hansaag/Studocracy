import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

import { TopQuestionContext } from "../../contexts/TopQuestionContext";
import { NewQuestionContext } from "../../contexts/NewQuestionContext";

const ListWrapper = styled.div`
  margin: 0 auto;
  margin-top: 10%;
  height: 100vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
`;

const ListItem = styled.li`
  margin: 5px;
`;

const List = styled.div`
  border: 1px solid black;
`;

export const TopList = () => {
  const { topQuestions, setTopQuestions } = useContext(TopQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return topQuestions.map((questionInfo) => (
        <ListItem>{questionInfo.question}</ListItem>
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
