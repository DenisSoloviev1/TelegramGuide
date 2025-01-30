import styled from "styled-components";
import "../../shared/variables.css";

export const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--color-background-container);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background);
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 1060px;
  padding: 10px 30px;

  @media screen and (max-width: 500px) {
    padding: 10px 15px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  background: var(--color-action);
  border-radius: 8px;
`;

export const SearchInput = styled.input`
  color: var(--color-font);
  outline: none;
  width: 100%;
  background: var(--color-background-container);
  padding: 12px;
  border-radius: 8px;
  appearance: none;
  transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
  transition-property: width, border-radius;
  z-index: 1;
  position: relative;
  font-size: 20px;
  border: 1px solid var(--color-font-disable);

  &:not(:placeholder-shown) {
    border-radius: 8px 0 0 8px;
    width: calc(100% - 50px);
  }
`;

export const SearchButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  font-weight: bold;
  background: var(--color-action);
  border-radius: 0 8px 8px 0;
  color: var(--color-font);
  border: none;
  cursor: pointer;

  ${SearchInput}:not(:placeholder-shown) + & {
    display: block;
  }
`;
