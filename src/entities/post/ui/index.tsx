import React from "react";
import {
  PostCard,
  Image,
  PostName,
  PublicDate,
  Text,
  ActionButton,
} from "./style";
import { IPost } from "../model";
import { CalendarSvg, DeleteSvg, EditSvg, Flex } from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { formatterDate } from "@/shared/lib";
import { useAuthStore } from "@/entities/user";
import { RolesDict } from "@/shared/types";

interface PostProps {
  post: IPost;
  onClick: () => void;
}
const MAX_TEXT_LENGTH = 50;
const MAX_NAME_LENGTH = 30;

export const Post: React.FC<PostProps> = ({ post, onClick }) => {
  const { id, name, createdAt, text, imageId } = post;
  const { role } = useAuthStore();

  return (
    <PostCard id={`${id}`} onClick={onClick}>
      <Image>
        <img src={`${baseUrl}/media/get/${imageId}`} alt="post_img" />
      </Image>

      <PostName>
        {name.length > MAX_NAME_LENGTH
          ? `${name.slice(0, MAX_NAME_LENGTH)}...`
          : name}
      </PostName>

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <PublicDate>
          <CalendarSvg />
          {createdAt && formatterDate(createdAt)}
        </PublicDate>

        {role === RolesDict.ADMIN && (
          <>
            <ActionButton onClick={(e) => e.stopPropagation()}>
              <EditSvg />
            </ActionButton>

            <ActionButton onClick={(e) => e.stopPropagation()}>
              <DeleteSvg />
            </ActionButton>
          </>
        )}
      </Flex>

      <Text>
        {text.length > MAX_TEXT_LENGTH
          ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
          : text}
      </Text>
    </PostCard>
  );
};
