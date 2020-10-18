import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  justify-content: flex-start;
  text-align: center;

  & h2 {
    color: ;
  }
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

const UpvoteContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Upvote = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: ${(props) => (props.highlighted ? "#d35400" : "#95a5a6")};
  outline: none;
`;

const UpvoteCount = styled.h4`
  margin-right: 5px;
`;

/** 
* The list of questions provded by participants in top-rated order. The list is 
rerendered on changes to the new question list.
*/

export const TopList = ({ upvote, upvotedQuestions }) => {
  const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
  const [renderedQuestions, setRenderedQuestions] = useState([]);

  useEffect(() => {
    setRenderedQuestions(() => {
      let topRated = newQuestions.sort((a, b) => b["upvotes"] - a["upvotes"]);
      return topRated.map((questionInfo, index) => {
        let highlighted = false;
        if (upvotedQuestions.upvoteIDs.includes(questionInfo.question_serial)) {
          highlighted = true;
        }
        return (
          <ListItem key={index}>
            <ListText>{questionInfo.question}</ListText>
            <UpvoteContainer>
              <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
              <Upvote
                onClick={() => upvote(questionInfo)}
                highlighted={highlighted}
              >
                <i className="fas fa-long-arrow-alt-up" id="upvote"></i>
              </Upvote>
            </UpvoteContainer>
          </ListItem>
        );
      });
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
      <h2>Highest rated</h2>
      <List>{renderedQuestions}</List>
    </ListWrapper>
  );
};
