import React from "react";
import {
  Qform,
  FormHeader,
  InputContainer,
  InputArea,
  SubmitButton,
} from "../shared/Forms";

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
