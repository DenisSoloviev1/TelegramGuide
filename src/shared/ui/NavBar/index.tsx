import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/entities/user";
import { NavItems, INav } from "./constants";
import styled from "styled-components";
import "@/shared/variables.css";

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
      {NavItems.filter(
        (link: INav) =>
          Array.isArray(link.allowedRoles) && link.allowedRoles.includes(role)
      ).map((link: INav) => (
        <NavLink
          key={link.id}
          data-id={`${link.id}`}
          to={link.path}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={link.label === "выйти" ? resetAuth : undefined}
        >
          {link.label}
        </NavLink>
      ))}
    </Nav>
  );
};
