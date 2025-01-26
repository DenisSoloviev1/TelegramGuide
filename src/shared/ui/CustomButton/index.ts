import styled from "styled-components";

export const CustomButton = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background-color: var(--color-action);
  color: var(--color-background);
  padding: 15px 25px;
  border-radius: 12px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgb(2, 53, 255);
  }
`;
