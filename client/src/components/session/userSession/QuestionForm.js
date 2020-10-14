import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import send from "../../../images/send.png";

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

export const QuestionForm = ({ submit }) => {
    return (
        <Qform>
            <FormHeader>Ask a question</FormHeader>
            <InputContainer>
                <InputArea id="input-question"></InputArea>
                <SubmitButton
                    onClick={() =>
                        submit(document.getElementById("input-question").value)
                    }
                >
                    Submit
                </SubmitButton>
            </InputContainer>
        </Qform>
    );
};
