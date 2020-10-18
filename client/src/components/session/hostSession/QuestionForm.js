import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import send from "../../../images/send.png";

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
  width: 30vw;
  height: 55px;
`;

const SubmitButton = styled.div`
  height: 98%;
  width: 55px;
  text-align: center;
  background-color: lightblue;
  font-size: 2em;
  border: 1px solid black;
`;

const SendButton = styled.img``;
/** 
* Component responsible for starting voting rounds from host. Host can formulate a question and
(when implemented) include options that participants can vote for.
*/

export const QuestionForm = ({ startVote }) => {
  return (
    <Qform>
      <FormHeader>Start voting round</FormHeader>
      <InputContainer>
        <InputArea
          id="vote-parameters"
          placeholder="Choose case to vote for and add options to the right"
        ></InputArea>
        <SubmitButton
          onClick={() =>
            startVote(document.getElementById("vote-parameters").value)
          }
        >
          +
        </SubmitButton>
      </InputContainer>
    </Qform>
  );
};
