import React from "react";
import { PostCard, PostCardImage, PostName, PublicDate } from "./style";
import { IPost } from "../model";
import { CalendarSvg, Flex } from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { formatterDate } from "@/shared/lib";
import { useNavigate } from "react-router-dom";

const MAX_NAME_LENGTH = 50;

export const Post: React.FC<IPost> = (post) => {
  const navigate = useNavigate();

  return (
    <PostCard id={`${post.id}`} onClick={() => navigate(`/posts/${post.id}`)}>
      <PostCardImage>
        <img src={`${baseUrl}/media/get/${post.imageId}`} alt="post_img" />
      </PostCardImage>

      <PostName>
        {post.name.length > MAX_NAME_LENGTH
          ? `${post.name.slice(0, MAX_NAME_LENGTH)}...`
          : post.name}
      </PostName>

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <PublicDate>
          <CalendarSvg />
          {post.createdAt && formatterDate(post.createdAt)}
        </PublicDate>
      </Flex>
    </PostCard>
  );
};
