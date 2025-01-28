import React, { useState } from "react";
import { PageImage, SectionTitle } from "../style";
import { CustomButton, Flex, NoDataSvg } from "@/shared/ui";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/entities/user";
import { RolesDict } from "@/shared/types";
import { Category } from "@/entities/category";
import { Skeleton } from "@mui/material";
import { useGetCategories } from "@/entities/category/hooks";
import CategoryModal from "@/widjets/CategoryModal";

export const Home: React.FC = () => {
  const { role } = useAuthStore();
  const { categories, isLoading, isError } = useGetCategories();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return (
    <>
      <Toaster />

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <SectionTitle>Категории каналов</SectionTitle>

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
        <Flex
          $direction="row"
          $gap={15}
          $wrap
          style={{ margin: "20px 0 40px" }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  animation="wave"
                  variant="rounded"
                  width={150}
                  height={50}
                  style={{ borderRadius: "6px" }}
                />
              ))
            : categories?.map((category) => (
                <Category
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  imageId={category.imageId}
                />
              ))}
        </Flex>
      )}

      <CategoryModal
        mode="add"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
};

export default Home;
