import React from "react";
import {
  ChannelCard,
  Avatar,
  Name,
  Description,
  LinkChannel,
  Followers,
} from "./style";
import { IChannel } from "../model";
import { Flex, FollowerSvg } from "@/shared/ui";

export const Channel: React.FC<IChannel> = ({
  id,
  img,
  name,
  description,
  link,
  followers,
}) => {
  return (
    <ChannelCard id={`${id}`}>
      <Avatar src={img} />

      <Flex $gap={5}>
        <Name>{name}</Name>

        <Flex $direction={"row"} $align={"center"} $gap={15}>
          <LinkChannel>@{link}</LinkChannel>

          <Followers>
            <FollowerSvg />
            {followers}
          </Followers>
        </Flex>

        <Description>{description}</Description>
      </Flex>
    </ChannelCard>
  );
};
