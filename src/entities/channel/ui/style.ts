import styled from "styled-components";

export const ChannelCard = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 20px;
  gap: 20px;
  background-color: var(--color-background-container);
  border: 1px solid #cccccc;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 1px solid var(--color-background-container);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const Avatar = styled.img`
  max-width: 100px;
  border-radius: 100%;
`;

export const Name = styled.h3`
  font-size: 24px;
  font-weight: 500;
`;

export const Description = styled.p``;

export const LinkChannel = styled.span`
  color: var(--color-font-disable);
`;

export const Followers = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--color-font-disable);

  svg {
    width: 15px;
    height: 15px;
    fill: var(--color-font-disable);
  }
`;
