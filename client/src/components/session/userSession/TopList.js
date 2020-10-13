import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

import { TopQuestionContext } from "../../../contexts/TopQuestionContext";
import { SessionState } from "../../../contexts/SessionState";

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-height: 65vh;
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
  display: flex;
  justify-content: space-between;
`;

const ListText = styled.p`
  margin-left: 10px;
`;

const Upvote = styled.div`
  width: 20px;
  height: 20px;
  background-color: green;
`;

const UpvoteCount = styled.div`
  width: 35px;
  height: 35px;

  & p {
    padding: 2px 2px 2px 2px;
  }
`;

export const TopList = ({ upvote }) => {
  const { topQuestions, setTopQuestions } = useContext(TopQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return topQuestions.map((questionInfo, index) => (
        <ListItem key={index}>
          <ListText>{questionInfo.question}</ListText>
          <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
          <Upvote onClick={() => upvote(questionInfo)}>O</Upvote>
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
