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
    width: 35px;
    height: 100%;
    background-color: green;
`;

const UpvoteCount = styled.p``;

export const ChronologicalList = ({ upvote }) => {
    const { newQuestions, setNewQuestions } = useContext(NewQuestionContext);
    const [renderedQuestions, setRenderedQuestions] = useState([]);

    useEffect(() => {
        setRenderedQuestions(() => {
            return newQuestions.map((questionInfo, index) => (
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
            <h2>New</h2>
            <List>{renderedQuestions}</List>
        </ListWrapper>
    );
};
