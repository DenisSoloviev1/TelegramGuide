import styled from "styled-components";

export const CustomButton = styled.button<{ $mode?: "normal" | "svg" }>`
  ${(props) =>
    (props.$mode ?? "normal") === "normal" &&
    `display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--color-action);
  color: var(--color-background);
  padding: 15px 25px;
  border-radius: 12px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgb(2, 53, 255);
  }`}

  ${(props) =>
    (props.$mode ?? "normal") === "svg" &&
    `width: 30px;
  height: 30px;
  transition: transform 0.3s ease-in-out;
  z-index: 1;

  svg {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    svg {
      transform: scale(1.05);
    }
  }`}
`;
