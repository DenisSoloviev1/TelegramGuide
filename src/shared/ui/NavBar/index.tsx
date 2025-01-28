import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/entities/user";
import styled from "styled-components";
import "@/shared/variables.css";
import { LogOutSvg } from "../Icon";
import { CustomButton } from "../CustomButton";
import { RolesDict } from "@/shared/types";
import { Path } from "@/shared/constants";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 20px;

  a {
    color: var(--color-font-disable);
    text-transform: uppercase;
    font-weight: 500;

    &:hover {
      color: var(--color-font);
    }
  }

  .active {
    color: var(--color-font);
  }
`;

export const NavBar: React.FC = () => {
  const { role, resetAuth } = useAuthStore();

  return (
    <Nav>
      <NavLink
        to={Path.HOME}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        главная
      </NavLink>

      <NavLink
        to={Path.POSTS}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        посты
      </NavLink>

      {role === RolesDict.ADMIN && (
        <CustomButton $mode={"svg"} onClick={() => resetAuth()}>
          <LogOutSvg />
        </CustomButton>
      )}
    </Nav>
  );
};
