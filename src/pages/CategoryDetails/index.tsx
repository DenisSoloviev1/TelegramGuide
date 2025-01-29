import React, { useState } from "react";
import { CircularProgress, Skeleton } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/user";
import {
  ArrowLeftSvg,
  CustomButton,
  DeleteSvg,
  Flex,
  Grid,
  NoDataSvg,
  PlusSvg,
  UpdateSvg,
} from "@/shared/ui";
import { useGetCategoryById } from "@/entities/category";
import { PageImage, SectionTitle } from "../style";
import { RolesDict } from "@/shared/types";
import { baseUrl } from "@/shared/config";
import CategoryModal from "@/widjets/CategoryModal";
import { CategoryContainer } from "@/entities/category/ui/style";
import ChannelModal from "@/widjets/ChannelModal";
import { Channel, useGetChannels } from "@/entities/channel";

export const CategoryDetails: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddChannelModal, setshowAddChannelModal] =
    useState<boolean>(false);

  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
  const {
    category,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
  } = useGetCategoryById(categoryIdNumber);
  const {
    channels,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
  } = useGetChannels(category?.id);

  return (
    <>
      <Toaster />

      <CustomButton onClick={() => navigate(-1)}>
        <ArrowLeftSvg />
      </CustomButton>

      {isErrorCategory ? (
        <Flex $align="center" style={{ marginTop: "30px" }}>
          <PageImage>
            <NoDataSvg />
          </PageImage>
        </Flex>
      ) : isLoadingCategory ? (
        <Flex $align="center" style={{ marginTop: "30px" }}>
          <CircularProgress />
        </Flex>
      ) : (
        <CategoryContainer>
          <Flex $direction="row" $align="center" $gap={15}>
            <Flex $width="auto" $direction="row" $align="center" $gap={5}>
              <img
                src={`${baseUrl}/media/get/${category?.imageId}`}
                alt="post_img"
              />

              <SectionTitle>{category?.name}</SectionTitle>
            </Flex>

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

                <CustomButton
                  $mode="svg"
                  onClick={() => setshowAddChannelModal(true)}
                >
                  <PlusSvg />
                </CustomButton>
              </>
            )}
          </Flex>

          {isErrorChannels ? (
            <Flex $align="center" style={{ marginTop: "30px" }}>
              <PageImage>
                <NoDataSvg />
              </PageImage>
            </Flex>
          ) : (
            <Grid $column={2} $gap={20}>
              {isLoadingChannels
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      animation="wave"
                      variant="rounded"
                      width={"100%"}
                      height={200}
                      style={{ borderRadius: "16px" }}
                    />
                  ))
                : channels.map((channel) => (
                    <Channel
                      key={channel.id}
                      id={channel.id}
                      name={channel.name}
                      userName={channel.userName}
                      description={channel.description}
                      categoryId={channel.categoryId}
                      imageId={channel.imageId}
                      keywords={channel.keywords}
                      membersCount={channel.membersCount}
                    />
                  ))}
            </Grid>
          )}
        </CategoryContainer>
      )}

      <CategoryModal
        mode="update"
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        сategoryData={category}
      />

      <CategoryModal
        mode="delete"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        сategoryData={category}
      />

      <ChannelModal
        mode="add"
        show={showAddChannelModal}
        onClose={() => setshowAddChannelModal(false)}
        categoryId={categoryIdNumber}
      />
    </>
  );
};

export default CategoryDetails;
