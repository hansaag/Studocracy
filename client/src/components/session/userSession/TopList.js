import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

import { SessionState } from "../../../contexts/SessionState";

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

const Upvote = styled.div`
    width: 20px;
    height: 20px;
    background-color: green;
`;

const UpvoteCount = styled.p``;

export const TopList = ({ upvote }) => {
    const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
    const [renderedQuestions, setRenderedQuestions] = useState([]);

    useEffect(() => {
        setRenderedQuestions(() => {
            let topRated = newQuestions.sort(
                (a, b) => b["upvotes"] - a["upvotes"]
            );
            return topRated.map((questionInfo, index) => (
                <ListItem key={index}>
                    <ListText>{questionInfo.question}</ListText>
                    <UpvoteCount>{questionInfo.upvotes}</UpvoteCount>
                    <Upvote onClick={() => upvote(questionInfo)}>O</Upvote>
                </ListItem>
            ));
        });
    }, [newQuestions]);

    return (
        <ListWrapper>
            <h2>Highest rated</h2>
            <List>{renderedQuestions}</List>
        </ListWrapper>
    );
};
