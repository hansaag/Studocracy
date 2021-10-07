import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  max-height: 85vh;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
`;

export const List = styled.div`
  margin: 0 auto;
  overflow-y: scroll;
  width: 40vw;
`;

export const ListItem = styled.li`
  margin: 15px;
  width: 90%;
  text-align: left;
  background-color: lightblue;
  border-radius: 20px;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

export const ListText = styled.p`
  padding: 10px;
  word-break: break-all;
`;

export const UpvoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Upvote = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: ${(props) => (props.highlighted ? "#d35400" : "#95a5a6")};
  outline: none;
`;

export const UpvoteCount = styled.h4`
  margin-right: 5px;
`;

export const UpvoteWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;