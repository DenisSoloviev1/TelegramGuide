import { Flex, NotFoundSvg } from "@/shared/ui";
import { NavLink } from "react-router-dom";
import React from "react";
import { Path } from "@/shared/constants";
import { PageImage } from "../style";
import { isMobile } from "@/shared/lib";

export const NotFound: React.FC = () => {
  return (
    <Flex
      $height={isMobile ? "" : "85vh"}
      $direction={isMobile ? "column" : "row"}
      $align={"center"}
    >
      <PageImage>
        <NotFoundSvg />
      </PageImage>

      <Flex $gap={10}>
        <h2 style={{fontSize: "30px"}}>Cтраница не найдена</h2>

        <span style={{fontSize: "25px"}}>
          Вернуться на <NavLink to={Path.HOME}>главную</NavLink>
        </span>
      </Flex>
    </Flex>
  );
};

export default NotFound;
