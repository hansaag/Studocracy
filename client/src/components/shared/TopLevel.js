import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const GridDiv = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 68vh 22vh;
  grid-gap: 10px;
  min-height: 100vh;
  width: 98%;
  margin: 0 1% 0 1%;
  overflow: scroll;
`;

export const TopQuestionDiv = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

export const NewQuestionsDiv = styled.div`
  grid-column: 2;
  grid-row: 1/2;
`;

export const InputWrapper = styled.div`
  grid-column: 1;
  grid-row: 2;
  margin: 0 0 15px 10px;
`;