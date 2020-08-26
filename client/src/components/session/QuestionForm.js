import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import send from "../../images/send.png";

const Qform = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormHeader = styled.h2``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const InputArea = styled.textarea`
  width: 80%;
  height: 15vh;
`;

const SendButton = styled.img``;

export const QuestionForm = () => {
  return (
    <Qform>
      <FormHeader>Still spørsmål</FormHeader>
      <InputContainer>
        <InputArea></InputArea>
      </InputContainer>
    </Qform>
  );
};
