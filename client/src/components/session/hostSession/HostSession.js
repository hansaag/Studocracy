import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
    FlexDivX,
    FlexDivY,
    GridDiv,
    GridItem,
    TopNav,
} from "../../styledUI/Conatainers";

import { SessionState } from "../../../contexts/SessionState";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

import { NavBar } from "../../navigationBar/NavBar";
import { ChronologicalList } from "./ChronologicalList";
import { TopList } from "./TopList";
import { QuestionForm } from "./QuestionForm";

const TopQuestionDiv = styled.div`
    grid-column: 1/5;
    grid-row: 1;
`;

const NewQuestionsDiv = styled.div`
    grid-column: 6/12;
    grid-row: 1/2;
`;

const InputWrapper = styled.div`
    grid-column: 1/5;
    grid-row: 2;
    margin-bottom: 10px;
`;

export const HostSession = () => {
    const { userContext, setUserContext } = useContext(SessionState);
    const [newQuestions, setNewQuestions] = useState([]);

    const registerVote = useCallback((question) => {
        console.log("vote submitted");
        userContext["activeSocket"].emit("votinground-sent", {
            user: userContext["activeSocket"].id,
            question: question,
            room: userContext["roomPin"],
        });
    });

    useEffect(() => {
        if (userContext["appContext"] === 1) {
            console.log("USER CONTEXT: ", userContext["appContext"]);
            userContext["activeSocket"].on("update-questions", (questions) => {
                console.log("host", questions);
                setNewQuestions(questions);
            });
        }
    }, []);

    return (
        <FlexDivY>
            <NavBar />
            <GridDiv>
                <NewQuestionContext.Provider
                    value={{ newQuestions, setNewQuestions }}
                >
                    <NewQuestionsDiv>
                        <ChronologicalList />
                    </NewQuestionsDiv>
                    <TopQuestionDiv>
                        <TopList />
                    </TopQuestionDiv>
                </NewQuestionContext.Provider>
                <InputWrapper>
                    <QuestionForm startVote={registerVote} />
                </InputWrapper>
            </GridDiv>
        </FlexDivY>
    );
};
