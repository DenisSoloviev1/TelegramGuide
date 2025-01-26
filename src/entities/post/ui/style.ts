import styled from "styled-components";

export const PostCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 10px;
  background-color: var(--color-background-container);
  border: 1px solid #cccccc;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 1px solid var(--color-background-container);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    img {
      transform: scale(1.05);
    }
  }
`;

export const Image = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${(props) => (props.$height ? props.$height : "200px")};
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }
`;

export const PostName = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin: 10px 0;
`;

export const PublicDate = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--color-font-disable);

  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-font-disable);
  }
`;

export const Text = styled.p<{ $fontSize?: number }>`
  margin: 10px 0;
  padding-left: 5px;
  font-size: ${(props) => `${props.$fontSize}px`};
`;

export const ActionButton = styled.button`
  width: 30px;
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
  }
`;
