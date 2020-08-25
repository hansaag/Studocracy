import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

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
  margin: 15px;
  text-align: left;
  background-color: lightblue;
  border-radius: 20px;
`;

const List = styled.div``;

export const ChronologicalList = () => {
  const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return newQuestions.map((questionInfo) => (
        <ListItem>{questionInfo.question}</ListItem>
      ));
    });
    console.log(newQuestions);
  }, [newQuestions]);

  return (
    <ListWrapper>
      <h2>Siste</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
