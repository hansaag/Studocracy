import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import send from "../../../images/send.png";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Qform = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormHeader = styled.h2`
    margin: 5px 0 10px 15px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const InputArea = styled.textarea`
    width: 30vw;
    height: 55px;
`;

const SubmitButton = styled.div`
    height: 10vh;
    width: 20%;
    text-align: center;
`;

const SendButton = styled.img``;

export const QuestionForm = ({ startVote }) => {
    return (
        <FormContainer>
            <Qform>
                <FormHeader>Start voting round</FormHeader>
                <InputContainer>
                    <InputArea
                        id="vote-parameters"
                        placeholder="Choose case to vote for and add options to the right"
                    ></InputArea>
                    <SubmitButton
                        onClick={() =>
                            startVote(
                                document.getElementById("vote-parameters").value
                            )
                        }
                    >
                        Submit
                    </SubmitButton>
                </InputContainer>
            </Qform>
        </FormContainer>
    );
};
