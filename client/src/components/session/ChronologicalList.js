import React, { useState, useContext } from "react";

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

const List = styled.div`
  border: 1px solid black;
`;

const ListItem = styled.li`
  margin: 5px;
`;

export const ChronologicalList = () => {
  const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
  const { topQuestions, setTopQuestions } = useContext(TopQuestionContext);
  return (
    <ListWrapper>
      <h2>Siste stilte</h2>
      <List></List>
    </ListWrapper>
  );
};
