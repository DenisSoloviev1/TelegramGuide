import styled from "styled-components";

export const PageTitle = styled.h1`
  margin: 20px 0;
  font-size: 32px;
  font-weight: 500;

  @media screen and (max-width: 670px) {
    font-size: 28px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;

  @media screen and (max-width: 400px) {
    font-size: 20px;
  }
`;

export const PageText = styled.p<{ $fontSize?: number }>`
  margin: 10px 0;
  padding-left: 5px;
  font-size: ${(props) => `${props.$fontSize}px`};
`;

export const PageImage = styled.div`
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

export const StatisticCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid var(--color-font-disable);
  background-color: var(--color-background-container);
  color: var(--color-action);
  font-size: 24px;
  font-weight: 600;

  span {
    font-size: 20px;
    font-weight: 400;
    color: var(--color-font);
  }
`;

export const AuthContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 450px;
  border-radius: 16px;
  border: 1px solid var(--color-font-disable);
  background-color: var(--color-background-container);
  padding: 20px;

  form {
    width: 100%;
  }

  h3 {
    font-size: 24px;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
  background-color: var(--color-background-container);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  gap: 10px;
`;
