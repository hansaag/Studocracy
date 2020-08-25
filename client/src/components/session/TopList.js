import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

import { TopQuestionContext } from "../../contexts/TopQuestionContext";

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
  margin: 15px;
  text-align: left;
  background-color: lightblue;
  border-radius: 20px;
`;

const List = styled.div``;

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
