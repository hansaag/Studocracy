import styled from "styled-components";

export const Qform = styled.form`
  margin: 0 0 3vh 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 20vh;
`;

export const FormHeader = styled.h2`
  margin: 5px 0 10px 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const InputArea = styled.textarea`
  width: 40vw;
  min-width: 200px;
  height: 55px;
`;

export const SubmitButton = styled.div`
  height: 98%;
  width: 55px;
  text-align: center;
  line-height: 55px;
  background-color: lightblue;
  font-size: 2em;
  border: 1px solid black;
`;