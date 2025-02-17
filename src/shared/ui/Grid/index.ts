import styled from "styled-components";

export const Grid = styled.div<{ $column: number; $gap?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, 1fr);
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "10px")};
  margin: 20px 0 40px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
