import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Main, Wrapper } from "./style.ts";
import { Flex, Logo, NavBar } from "@/shared/ui";
import { isMobile } from "@/shared/lib/isMobile.ts";

const Layout: React.FC = () => {
  return (
    <>
      <Header>
        <Wrapper>
          <Flex
            $direction={isMobile ? "column" : "row"}
            $justify={isMobile ? "start" : "space-between"}
            $align={isMobile ? "start" : "center"}
          >
            <Logo />

            <NavBar />
          </Flex>
        </Wrapper>
      </Header>

      <Main>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </Main>

      {/* <Footer>
        <Wrapper></Wrapper>
      </Footer> */}
    </>
  );
};

export default Layout;
