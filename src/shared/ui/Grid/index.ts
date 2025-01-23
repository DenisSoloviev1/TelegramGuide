import styled from "styled-components";

export const Grid = styled.div<{ $column: number; $gap?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, 1fr);
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "10px")};
  margin-bottom: 40px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
