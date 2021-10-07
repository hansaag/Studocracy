import React from "react";
import {
  Qform,
  FormHeader,
  InputContainer,
  InputArea,
  SubmitButton,
} from "../shared/Forms";



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
