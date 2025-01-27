import React from "react";
import { PostCard, Image, PostName, PublicDate, Text } from "./style";
import { IPost } from "../model";
import { CalendarSvg, Flex } from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { formatterDate } from "@/shared/lib";
import { useNavigate } from "react-router-dom";

const MAX_TEXT_LENGTH = 50;
const MAX_NAME_LENGTH = 30;

export const Post: React.FC<IPost> = ({id, name, createdAt, text, imageId}) => {
  const navigate = useNavigate();

  return (
    <PostCard id={`${id}`} onClick={() => navigate(`/posts/${id}`)}>
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
      </Flex>

      <Text>
        {text.length > MAX_TEXT_LENGTH
          ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
          : text}
      </Text>
    </PostCard>
  );
};
