import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@mui/material";
import { Post } from "@/entities/post";
import { PageImage, PageText } from "../style";
import { Flex, Grid, CustomButton, NoDataSvg } from "@/shared/ui";
import { useAuthStore } from "@/entities/user";
import { RolesDict } from "@/shared/types";
import PostModal from "@/widjets/PostModal";
import { useGetPosts } from "@/entities/post";

export const Posts: React.FC = () => {
  const { role } = useAuthStore();
  const { posts, isLoading, isError, loadMorePosts } = useGetPosts();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const handleLoadMore = async () => {
    await loadMorePosts(20); 
  };

  return (
    <>
      <Toaster />

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <PageText $fontSize={24}>Посты</PageText>

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
        <Flex $align="center">
          <Grid $column={3}>
            {isLoading && posts.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    animation="wave"
                    variant="rounded"
                    width={"100%"}
                    height={300}
                    style={{ borderRadius: "16px" }}
                  />
                ))
              : posts.map((post) => <Post key={post.id} {...post} />)}
          </Grid>

          {/* Кнопка для загрузки следующих постов */}
          <CustomButton onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "загрузка..." : "читать дальше"}
          </CustomButton>
        </Flex>
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