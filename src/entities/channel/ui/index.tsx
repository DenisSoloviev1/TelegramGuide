import React from "react";
import { ChannelCard, Name, UserName, Followers, KeyWords } from "./style";
import { IChannel } from "../model";
import { Flex, FollowerSvg } from "@/shared/ui";
import { baseUrl } from "@/shared/config";

const MAX_DESCRIPTION_LENGTH = 50;

export const Channel: React.FC<IChannel> = ({
  id,
  name,
  userName,
  description = "",
  imageId,
  keywords,
  membersCount,
}) => {
  return (
    <ChannelCard
      id={`${id}`}
      onClick={() => window.open(`https://t.me/${userName}`, "_blank")}
    >
      <img src={`${baseUrl}/media/get/${imageId}`} alt="channel_img" />

      <Flex $gap={5}>
        <Name>{name}</Name>

        <Flex $direction={"row"} $align={"center"} $gap={15}>
          <UserName>@{userName}</UserName>

          <Followers>
            <FollowerSvg />
            {membersCount}
          </Followers>
        </Flex>

        <p>
          {description?.length > MAX_DESCRIPTION_LENGTH
            ? `${description?.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : description}
        </p>

        <KeyWords>
          {keywords.map((keyword) => (
            <span key={keyword}>#{keyword}</span>
          ))}
        </KeyWords>
      </Flex>
    </ChannelCard>
  );
};
