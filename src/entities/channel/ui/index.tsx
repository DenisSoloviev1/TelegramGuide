import React from "react";
import {
  ChannelCard,
  Name,
  UserName,
  Followers,
  KeyWords,
  ChannelImage,
} from "./style";
import { IChannel } from "../model";
import { Flex, FollowerSvg } from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { useNavigate } from "react-router-dom";
import { RolesDict } from "@/shared/types";
import { useAuthStore } from "@/entities/user";

const MAX_DESCRIPTION_LENGTH = 60;

export const Channel: React.FC<IChannel> = (channel) => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <ChannelCard
      id={`${channel.id}`}
      onClick={() => navigate(`/channel/${channel.id}`)}
    >
      <ChannelImage
        src={`${baseUrl}/media/get/${channel.imageId}`}
        alt="channel_img"
      />

      <Flex $gap={5}>
        <Name>{channel.name}</Name>

        <Flex $direction="row" $align="center" $gap={15}>
          <UserName>@{channel.userName}</UserName>

          <Followers>
            <FollowerSvg />
            {channel.membersCount}
          </Followers>
        </Flex>

        <p>
          {channel.description &&
          channel.description.length > MAX_DESCRIPTION_LENGTH
            ? `${channel.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : channel.description || ""}
        </p>

        {role === RolesDict.ADMIN && (
          <KeyWords>
            {channel.keywords.map((keyword) => (
              <span key={keyword}>#{keyword}</span>
            ))}
          </KeyWords>
        )}
      </Flex>
    </ChannelCard>
  );
};
