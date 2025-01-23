import styled from "styled-components";

export const PageTitle = styled.h1`
  margin: 20px 0;
  font-size: 30px;
  font-weight: 500;
`;

export const Image = styled.div`
  max-width: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 50px;

  svg {
    width: 100%;
    height: 100%;
  }
    
  @media screen and (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 50px;
  }
`;
