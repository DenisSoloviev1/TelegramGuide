import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import {
  CalendarSvg,
  CustomButton,
  DeleteSvg,
  UpdateSvg,
  Flex,
  NoDataSvg,
  ArrowLeft,
} from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { PostContainer, PublicDate } from "@/entities/post/ui/style";
import { formatterDate } from "@/shared/lib";
import { useAuthStore } from "@/entities/user";
import { PageImage, PageText, PageTitle } from "../style";
import { RolesDict } from "@/shared/types";
import { useGetPostById } from "@/entities/post";
import PostModal from "@/widjets/PostModal";

export const PostDetails: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const { postId } = useParams<{ postId: string }>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const postIdNumber = postId ? Number(postId) : undefined;
  const { post, isLoading, isError } = useGetPostById(postIdNumber);

  return (
    <>
      <Toaster />

      <CustomButton onClick={() => navigate(-1)}>
        <ArrowLeft size={30} /> вернуться
      </CustomButton>

      {isError ? (
        <Flex $align="center" style={{ marginTop: "30px" }}>
          <PageImage>
            <NoDataSvg />
          </PageImage>
        </Flex>
      ) : isLoading ? (
        <Flex $align="center" style={{ marginTop: "30px" }}>
          <CircularProgress />
        </Flex>
      ) : (
        <PostContainer>
          <Flex $direction="row" $align="center" $gap={15}>
            <PublicDate>
              <CalendarSvg />
              {post?.createdAt && formatterDate(post.createdAt)}
            </PublicDate>

            {role === RolesDict.ADMIN && (
              <>
                <CustomButton
                  $style="svg"
                  onClick={() => setShowUpdateModal(true)}
                >
                  <UpdateSvg />
                </CustomButton>

                <CustomButton
                  $style="svg"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <DeleteSvg />
                </CustomButton>
              </>
            )}
          </Flex>

          <PageTitle>{post?.name}</PageTitle>

          <img src={`${baseUrl}/media/get/${post?.imageId}`} alt="post_img" />

          <PageText $fontSize={20}>{post?.text}</PageText>
        </PostContainer>
      )}

      <PostModal
        mode="update"
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        postData={post}
      />

      <PostModal
        mode="delete"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        postData={post}
      />
    </>
  );
};

export default PostDetails;
