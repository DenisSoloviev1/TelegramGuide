import React, { useState } from "react";
import { CircularProgress, Skeleton } from "@mui/material";
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
import { CategoryContainer, CategoryImage } from "@/entities/category/ui/style";
import ChannelModal from "@/widjets/ChannelModal";
import { Channel, useGetChannels } from "@/entities/channel";

export const CategoryDetails: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
  const {
    category,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    refetch: refetchCategoryById,
  } = useGetCategoryById(categoryIdNumber);
  const {
    channels,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
    loadMoreChannels,
    refetch: refetchChannels,
  } = useGetChannels(categoryIdNumber);

  const handleLoadMore = async () => {
    await loadMoreChannels(20);
  };

  // состояния открытия редактирования и удаления категории
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] =
    useState<boolean>(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] =
    useState<boolean>(false);

  // состояние открытия создания канала
  const [showAddChannelModal, setShowAddChannelModal] =
    useState<boolean>(false);

  return (
    <>
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
              <CategoryImage
                src={`${baseUrl}/media/get/${category?.imageId}`}
                alt="post_img"
              />

              <SectionTitle>{category?.name}</SectionTitle>
            </Flex>

            {role === RolesDict.ADMIN && (
              <>
                <CustomButton
                  $mode="svg"
                  onClick={() => setShowUpdateCategoryModal(true)}
                >
                  <UpdateSvg />
                </CustomButton>

                <CustomButton
                  $mode="svg"
                  onClick={() => setShowDeleteCategoryModal(true)}
                >
                  <DeleteSvg />
                </CustomButton>

                <CustomButton
                  $mode="svg"
                  onClick={() => setShowAddChannelModal(true)}
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
                    <Channel key={channel.id} {...channel} />
                  ))}
            </Grid>
          )}

          {/* Кнопка для загрузки следующих каналов */}
          {channels.length > 20 && (
            <CustomButton onClick={handleLoadMore} disabled={isLoadingChannels}>
              {isLoadingChannels ? "загрузка..." : "читать дальше"}
            </CustomButton>
          )}

          {channels.length === 0 && (
            <PageImage>
              <NoDataSvg />
            </PageImage>
          )}
        </CategoryContainer>
      )}

      {/* модалки редактирования и удаления категории */}
      <CategoryModal
        mode="update"
        show={showUpdateCategoryModal}
        onClose={() => setShowUpdateCategoryModal(false)}
        onSuccess={() => refetchCategoryById()}
        сategoryData={category}
      />

      <CategoryModal
        mode="delete"
        show={showDeleteCategoryModal}
        onClose={() => setShowDeleteCategoryModal(false)}
        onSuccess={() => refetchCategoryById()}
        сategoryData={category}
      />

      {/* модалка создания канала */}
      <ChannelModal
        mode="add"
        show={showAddChannelModal}
        onClose={() => setShowAddChannelModal(false)}
        onSuccess={() => refetchChannels()}
        categoryId={categoryIdNumber}
      />
    </>
  );
};

export default CategoryDetails;
