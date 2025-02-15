import React, { useState } from "react";
import { PageImage, SectionTitle, StatisticCard } from "../style";
import { CustomButton, Flex, NoDataSvg } from "@/shared/ui";
import { useAuthStore } from "@/entities/user";
import { RolesDict } from "@/shared/types";
import { Category } from "@/entities/category";
import { Skeleton } from "@mui/material";
import { useGetCategories } from "@/entities/category/hooks";
import CategoryModal from "@/widjets/CategoryModal";
import { useGetStatisticsChannels } from "@/entities/channel";

export const Home: React.FC = () => {
  const { role } = useAuthStore();
  const {
    categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    refetch: refetchCaterogies,
  } = useGetCategories();
  const {
    statisticsChannels,
    isLoading: isLoadingStatisticsChannels,
    isError: isErrorStatisticsChannels,
  } = useGetStatisticsChannels();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return (
    <>
      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <SectionTitle>Категории каналов</SectionTitle>

        {role === RolesDict.ADMIN && (
          <CustomButton onClick={() => setShowAddModal(true)}>
            добавить
          </CustomButton>
        )}
      </Flex>

      {isErrorCategories ? (
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
          {isLoadingCategories
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
                <Category key={category.id} {...category} />
              ))}
        </Flex>
      )}

      <SectionTitle>Статистика по каналам</SectionTitle>

      {!isErrorStatisticsChannels && (
        <Flex $direction="row" $gap={20} $wrap style={{ margin: "20px 0" }}>
          {isLoadingStatisticsChannels ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rounded"
                width={200}
                height={72}
                style={{ borderRadius: "6px" }}
              />
            ))
          ) : (
            <>
              <StatisticCard>
                + {statisticsChannels?.today}
                <span>добавлено сегодня</span>
              </StatisticCard>

              <StatisticCard>
                + {statisticsChannels?.yesterday}
                <span>добавлено вчера</span>
              </StatisticCard>

              <StatisticCard>
                {statisticsChannels?.allTime}
                <span>всего</span>
              </StatisticCard>
            </>
          )}
        </Flex>
      )}

      <CategoryModal
        mode="add"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => refetchCaterogies()}
      />
    </>
  );
};

export default Home;
