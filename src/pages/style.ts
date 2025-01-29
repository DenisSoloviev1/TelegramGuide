import styled from "styled-components";

export const PageTitle = styled.h1`
  margin: 20px 0;
  font-size: 28px;
  font-weight: 500;
`;

export const SectionTitle = styled.h2`
  margin: 20px 0 15px;
  font-size: 24px;
  font-weight: 500;
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
