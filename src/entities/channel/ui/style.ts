import styled from "styled-components";

export const ChannelCard = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 20px;
  background-color: var(--color-background-container);
  border: 1px solid #cccccc;
  transition: all 0.3s ease-in-out;
  gap: 10px;

  &:hover {
    border: 1px solid var(--color-background-container);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

export const ChannelImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
`;

export const Name = styled.h3`
  font-size: 24px;
  font-weight: 500;

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;

export const UserName = styled.span`
  color: var(--color-font-disable);
`;

export const Followers = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-font-disable);
`;

export const KeyWords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  span {
    color: var(--color-action);
  }
`;

export const ChannelAction = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  align-content: center;
  gap: 10px;
  backdrop-filter: blur(5px);
  border-radius: 6px;
  padding: 5px;
`;

export const Background = styled.div`
  width: 100%;
  background: url(/background.png) no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 6px;
`;

export const ChannelAvatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 670px) {
    width: 100px;
    height: 100px;
  }
`;
