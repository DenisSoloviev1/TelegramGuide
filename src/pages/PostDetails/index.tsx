import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  CalendarSvg,
  CustomButton,
  DeleteSvg,
  UpdateSvg,
  Flex,
  NoDataSvg,
  ArrowLeftSvg,
} from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { PostContainer, PublicDate } from "@/entities/post/ui/style";
import { formatterDate } from "@/shared/lib";
import { useAuthStore } from "@/entities/user";
import { PageImage, PageText, SectionTitle } from "../style";
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
  const { post, isLoading, isError, refetch } = useGetPostById(postIdNumber);

  return (
    <>
      <CustomButton onClick={() => navigate(-1)}>
        <ArrowLeftSvg />
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
                  $mode="svg"
                  onClick={() => setShowUpdateModal(true)}
                >
                  <UpdateSvg />
                </CustomButton>

                <CustomButton
                  $mode="svg"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <DeleteSvg />
                </CustomButton>
              </>
            )}
          </Flex>

          <SectionTitle>{post?.name}</SectionTitle>

          <img src={`${baseUrl}/media/get/${post?.imageId}`} alt="post_img" />

          <PageText $fontSize={20}>{post?.text}</PageText>
        </PostContainer>
      )}

      <PostModal
        mode="update"
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSuccess={() => refetch()}
        postData={post}
      />

      <PostModal
        mode="delete"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={() => refetch()}
        postData={post}
      />
    </>
  );
};

export default PostDetails;
