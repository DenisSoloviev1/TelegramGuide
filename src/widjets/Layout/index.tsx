import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Header,
  Logo,
  Main,
  SearchButton,
  SearchContainer,
  SearchInput,
  Wrapper,
} from "./style.ts";
import { Flex, LogoSvg, NavBar, SearchSvg } from "@/shared/ui";
import { isMobile } from "@/shared/lib/isMobile.ts";
import { PageTitle } from "@/pages/style.ts";
import { getChannels } from "@/entities/channel";
import toast, { Toaster } from "react-hot-toast";
import { Path } from "@/shared/constants/index.tsx";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    const response = await getChannels(50, 0, undefined, search);
    if (response.length === 0) {
      toast.error("Совпадений нет");
    } else {
      navigate(Path.SEARCH, { state: { channels: response } });
    }
  };

  return (
    <>
      <Toaster />

      <Header>
        <Wrapper>
          <Flex
            $direction={isMobile ? "column" : "row"}
            $justify={isMobile ? "start" : "space-between"}
            $align={"center"}
          >
            <Logo onClick={() => navigate(Path.HOME)}>
              <LogoSvg />
            </Logo>
            <NavBar />
          </Flex>
        </Wrapper>
      </Header>

      <Main>
        <Wrapper>
          <PageTitle>Ищи. Подписывайся. Наслаждайся!</PageTitle>

          {/* Блок поиска */}
          <Flex $gap={10} style={{ marginBottom: "20px" }}>
            <SearchContainer role="search">
              <SearchInput
                type="search"
                placeholder="поиск каналов"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchButton onClick={handleSearch}>
                <SearchSvg />
              </SearchButton>
            </SearchContainer>
          </Flex>

          <Outlet />
        </Wrapper>
      </Main>
    </>
  );
};

export default Layout;
