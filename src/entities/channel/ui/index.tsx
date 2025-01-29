import React from "react";
import {
  ChannelCard,
  Name,
  UserName,
  Followers,
  KeyWords,
  ChannelAction,
} from "./style";
import { IChannel } from "../model";
import {
  CustomButton,
  DeleteSvg,
  Flex,
  FollowerSvg,
  UpdateSvg,
} from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { RolesDict } from "@/shared/types";
import { useAuthStore } from "@/entities/user";

const MAX_DESCRIPTION_LENGTH = 50;

interface ChannelProps extends IChannel {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const Channel: React.FC<ChannelProps> = ({
  id,
  name,
  userName,
  description = "", // Дефолтное значение
  imageId,
  keywords,
  membersCount,
  onEditClick,
  onDeleteClick,
}) => {
  const { role } = useAuthStore();

  return (
    <ChannelCard
      id={`${id}`}
      onClick={() => window.open(`https://t.me/${userName}`, "_blank")}
    >
      <img src={`${baseUrl}/media/get/${imageId}`} alt="channel_img" />

      <Flex $gap={5}>
        <Name>{name}</Name>

        <Flex $direction="row" $align="center" $gap={15}>
          <UserName>@{userName}</UserName>

          <Followers>
            <FollowerSvg />
            {membersCount}
          </Followers>
        </Flex>

        <p>
          {description.length > MAX_DESCRIPTION_LENGTH
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : description}
        </p>

        <KeyWords>
          {keywords.map((keyword) => (
            <span key={keyword}>#{keyword}</span>
          ))}
        </KeyWords>
      </Flex>

      {role === RolesDict.ADMIN && (
        <ChannelAction>
          <CustomButton
            $mode="svg"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
          >
            <UpdateSvg />
          </CustomButton>

          <CustomButton
            $mode="svg"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
          >
            <DeleteSvg />
          </CustomButton>
        </ChannelAction>
      )}
    </ChannelCard>
  );
};
