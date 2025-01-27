import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@mui/material";
import { Post, useGetPosts } from "@/entities/post";
import { PageImage, PageTitle } from "../style";
import { Flex, Grid, CustomButton, NoDataSvg } from "@/shared/ui";
import { useAuthStore } from "@/entities/user";
import { RolesDict } from "@/shared/types";
import PostModal from "@/widjets/PostModal";

export const Posts: React.FC = () => {
  const { role } = useAuthStore();
  const { posts, isLoading, isError } = useGetPosts();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return (
    <>
      <Toaster />

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <PageTitle>Посты</PageTitle>

        {role === RolesDict.ADMIN && (
          <CustomButton onClick={() => setShowAddModal(true)}>
            добавить
          </CustomButton>
        )}
      </Flex>

      {isError ? (
        <Flex $align="center">
          <PageImage>
            <NoDataSvg />
          </PageImage>
        </Flex>
      ) : (
        <Grid $column={3}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  animation="wave"
                  variant="rounded"
                  width={330}
                  height={390}
                  style={{ borderRadius: "16px" }}
                />
              ))
            : posts?.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  name={post.name}
                  text={post.text}
                  createdAt={post.createdAt}
                  imageId={post.imageId}
                />
              ))}
        </Grid>
      )}

      <PostModal
        mode="add"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
};

export default Posts;
