import styled from "styled-components";

export const CategoryCard = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;
  border-radius: 6px;
  border: 1px solid var(--color-font-disable);
  background-color: var(--color-background-container);
  color: var(--color-font);
  transition: all 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
    border: 1px solid var(--color-background-container);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    height: 40px;
    width: 40px;
    border-radius: 3px;
    object-fit: cover;
  }

  span {
    font-size: 16px;
  }
`;
