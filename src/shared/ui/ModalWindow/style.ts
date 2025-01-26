import styled from "styled-components";

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: rgba(133, 132, 132, 0.3);
`;

export const ModalContent = styled.div<{
  $width?: string;
  $height?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : `auto`)};
  height: ${(props) => (props.$height ? props.$height : `auto`)};
  max-height: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: var(--color-background);
  padding: 20px;
  border: 1px solid var(--color-font-disable);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
  z-index: 4;
  overflow-y: scroll;
`;
