import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  Main,
  SearchButton,
  SearchContainer,
  SearchInput,
  Wrapper,
} from "./style.ts";
import { Flex, Grid, Logo, NavBar, SearchSvg } from "@/shared/ui";
import { isMobile } from "@/shared/lib/isMobile.ts";
import { PageTitle } from "@/pages/style.ts";
import {
  Channel,
  IChannel,
  getChannels,
} from "@/entities/channel";
import toast from "react-hot-toast";

const Layout: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [channels, setChannels] = useState<IChannel[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    const response = await getChannels(50, 0, undefined, search);//звято 50 каналов, пропущено 0, id категории нет
    if (response.length === 0) {
      toast.error("Совпадений нет");
    }
    setChannels(response);
  };

  return (
    <>
      <Header>
        <Wrapper>
          <Flex
            $direction={isMobile ? "column" : "row"}
            $justify={isMobile ? "start" : "space-between"}
            $align={"center"}
          >
            <Logo />
            <NavBar />
          </Flex>
        </Wrapper>
      </Header>

      <Main>
        <Wrapper>
          <PageTitle>Ищи. Подписывайся. Наслаждайся!</PageTitle>

          {/* Блок поиска */}
          <Flex
            $direction={isMobile ? "column" : "row"}
            $align="center"
            $gap={10}
            style={{ marginBottom: "20px" }}
          >
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

          {/* Если есть каналы, выводим их, иначе рендерим `Outlet` */}
          {isSearching && channels.length > 0 ? (
            <Grid $column={1} $gap={20}>
              {channels.map((channel) => (
                <Channel key={channel.id} {...channel} />
              ))}
            </Grid>
          ) : (
            <Outlet />
          )}
        </Wrapper>
      </Main>
    </>
  );
};

export default Layout;
