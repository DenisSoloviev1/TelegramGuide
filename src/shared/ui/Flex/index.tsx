import styled from "styled-components";

export const Flex = styled.div<{
  $width?: string;
  $height?: string;
  $justify?: string;
  $align?: string;
  $direction?: string;
  $gap?: number;
}>`
  width: ${(props) => props.$width ?? "100%"};
  height: ${(props) => props.$height ?? ""};
  display: flex;
  flex-direction: ${(props) => props.$direction ?? "column"};
  justify-content: ${(props) => props.$justify ?? "flex-start"};
  align-items: ${(props) => props.$align ?? "start"};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "initial")};
`;
