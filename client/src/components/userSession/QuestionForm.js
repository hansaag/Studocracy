import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import send from "../../images/send.png";

const Qform = styled.form`
  margin: 0 0 3vh 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 20vh;
`;

const FormHeader = styled.h2`
  margin: 5px 0 10px 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const InputArea = styled.textarea`
  width: 40vw;
  min-width: 200px;
  height: 55px;
`;

const SubmitButton = styled.div`
  height: 98%;
  width: 55px;
  text-align: center;
  line-height: 55px;

  background-color: lightblue;
  font-size: 2em;
  border: 1px solid black;
`;

const SendButton = styled.img``;

/**
 * Component responsible for users asking questions to the session room.
 */

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
          +
        </SubmitButton>
      </InputContainer>
    </Qform>
  );
};
