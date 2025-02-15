import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  CustomButton,
  DeleteSvg,
  UpdateSvg,
  Flex,
  NoDataSvg,
  ArrowLeftSvg,
} from "@/shared/ui";
import { baseUrl } from "@/shared/config";
import { useAuthStore } from "@/entities/user";
import { PageImage, PageText, SectionTitle, Container } from "../style";
import { RolesDict } from "@/shared/types";
import { useGetChannelById } from "@/entities/channel";
import ChannelModal from "@/widjets/ChannelModal";
import { Background, ChannelAvatar } from "@/entities/channel/ui/style";

export const ChannelDetails: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const { channelId } = useParams<{ channelId: string }>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const channelIdNumber = channelId ? Number(channelId) : undefined;
  const { channel, isLoading, isError, refetch } =
    useGetChannelById(channelIdNumber);

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
        <Container>
          <Flex $direction={"row"} $align="center" $gap={15}>
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

          <Background>
            <ChannelAvatar
              src={`${baseUrl}/media/get/${channel?.imageId}`}
              alt="channel_img"
            />
          </Background>

          <SectionTitle>{channel?.name}</SectionTitle>

          <PageText $fontSize={20}>{channel?.description}</PageText>

          <CustomButton
            onClick={() =>
              window.open(`https://t.me/${channel?.userName}`, "_blank")
            }
          >
            перейти
          </CustomButton>
        </Container>
      )}

      <ChannelModal
        mode="update"
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSuccess={() => refetch()}
        channelData={channel}
      />

      <ChannelModal
        mode="delete"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={() => refetch()}
        channelData={channel}
      />
    </>
  );
};

export default ChannelDetails;
