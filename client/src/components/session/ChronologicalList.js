import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

import { NewQuestionContext } from "../../contexts/NewQuestionContext";

const ListWrapper = styled.div`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
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

export const ChronologicalList = () => {
  const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return newQuestions.map((questionInfo) => (
        <ListItem>
          <ListText>{questionInfo.question}</ListText>
        </ListItem>
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
