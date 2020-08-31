import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import send from "../../../images/send.png";

const Qform = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.h2``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const InputArea = styled.textarea`
  width: 80%;
  height: 10vh;
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
      <FormHeader>Still spørsmål</FormHeader>
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
