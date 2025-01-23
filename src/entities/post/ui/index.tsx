import React from "react";
import { PostCard, Image, PostTitle, Date, Text, EditButton } from "./style";
import { IPost } from "../model";
import { CalendarSvg, EditSvg, Flex } from "@/shared/ui";

interface PostProps extends IPost {
  onClick: () => void;
}
const MAX_TEXT_LENGTH = 50; // Максимальное количество символов

export const Post: React.FC<PostProps> = ({
  id,
  img,
  title,
  date,
  text,
  onClick,
}) => {
  return (
    <PostCard id={`${id}`} onClick={onClick}>
      <Image>
        <img src={img} alt="post_img" />
      </Image>

      <PostTitle>{title}</PostTitle>

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <Date>
          <CalendarSvg />
          {date}
        </Date>

        <EditButton>
          <EditSvg />
        </EditButton>
      </Flex>

      <Text>
        {text.length > MAX_TEXT_LENGTH
          ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
          : text}
      </Text>
    </PostCard>
  );
};
