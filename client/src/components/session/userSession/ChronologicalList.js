import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  max-height: 85vh;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
`;

const List = styled.div`
  overflow-y: scroll;
  width: 45vw;
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
  margin-left: 10px;
`;

const Upvote = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: #95a5a6;
  outline: none;
`;

const UpvoteCount = styled.p``;

/** 
* The list of questions provded by participants in chronological order. The list is 
rerendered every time the server proved updates.
*/

export const ChronologicalList = ({ upvote }) => {
  const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      return newQuestions.map((questionInfo, index) => 
        <ListItem key={index}>
          <ListText>{questionInfo.question}</ListText>
          <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
          <Upvote onClick={() => upvote(questionInfo)}>
            <i className="fas fa-long-arrow-alt-up" id="upvote"></i>
          </Upvote>
        </ListItem>
      ));
    });
  }, [newQuestions]);

  return (
    <ListWrapper>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.0/css/all.css"
        integrity="sha384-aOkxzJ5uQz7WBObEZcHvV5JvRW3TUc2rNPA7pe3AwnsUohiw1Vj2Rgx2KSOkF5+h"
        crossOrigin="anonymous"
      ></link>
      <h2>New</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
