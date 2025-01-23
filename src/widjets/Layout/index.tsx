import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Main, Wrapper } from "./style.ts";
import { Flex, Logo, NavBar } from "@/shared/ui";

const Layout: React.FC = () => {
  return (
    <>
      <Header>
        <Wrapper>
          <Flex $direction={"row"} $justify={"space-between"} $align={"center"}>
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
