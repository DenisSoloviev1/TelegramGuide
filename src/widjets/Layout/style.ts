import styled from "styled-components";
import "../../shared/variables.css";

export const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const Footer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-container);
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.2);
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 1060px;
  padding: 10px 30px;
`;
