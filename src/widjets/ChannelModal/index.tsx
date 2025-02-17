import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ModalWindow, Flex, Input, CustomButton } from "@/shared/ui";
import toast from "react-hot-toast";
import { isMobile } from "@/shared/lib";
import { PageText } from "@/pages/style";
import {
  addChannel,
  deleteChannel,
  IChannel,
  updateChannel,
} from "@/entities/channel";

interface ChannelModalProps {
  mode: "add" | "update" | "delete";
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  channelData?: IChannel; // Для редактирования и удаления
  categoryId?: number; // Для создания
}

const ChannelModal: React.FC<ChannelModalProps> = ({
  mode,
  show,
  onClose,
  onSuccess,
  channelData,
  categoryId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IChannel>({
    defaultValues: channelData || {},
  });

  // Устанавливаем categoryId при монтировании компонента
  useEffect(() => {
    if (categoryId) {
      setValue("categoryId", categoryId);
    }
  }, [categoryId, setValue]);

  const handleSuccess = () => {
    onSuccess?.(); // Вызываем onSuccess, если он передан
    onClose(); // Закрываем модалку
  };

  const handleFormSubmit: SubmitHandler<IChannel> = async (data) => {
    // Проверяем, является ли keywords массивом
    const keywordsString = Array.isArray(data.keywords)
      ? data.keywords.join(" ") // Если массив, превращаем в строку
      : data.keywords; // Если строка, оставляем как есть

    // Разбиваем keywords на массив строк по пробелу и фильтруем пустые строки
    const formattedKeywords = keywordsString
      .split(" ")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);

    try {
      if (mode === "add") {
        await toast.promise(
          addChannel({ ...data, keywords: formattedKeywords }),
          {
            loading: "Создание канала...",
            success: "Канал создан",
            error: "Канал не создан",
          }
        );
      } else {
        await toast.promise(
          updateChannel(
            { ...data, keywords: formattedKeywords },
            channelData?.id
          ),
          {
            loading: "Редактирование канала...",
            success: "Канал отредактирован",
            error: "Канал не отредактирован",
          }
        );
      }
      handleSuccess();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await toast.promise(deleteChannel(channelData?.id), {
        loading: "Удаление канала...",
        success: "Канал удален",
        error: "Канал не удален",
      });
      handleSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWindow
      show={show}
      onClick={onClose}
      width={isMobile ? "90%" : "500px"}
    >
      {mode === "add" ? (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label="Имя телеграм"
              {...register("userName", {
                required: "Имя телеграм обязательно",
              })}
              placeholder="user_name_telegram"
              error={errors.userName?.message}
            />

            <Input
              label="Ключевые слова"
              type="textarea"
              {...register("keywords", {
                required: "Ключевые слова обязательны",
              })}
              placeholder="через пробел без запятых"
              error={errors.keywords?.message}
            />

            <CustomButton type="submit">Создать</CustomButton>
          </Flex>
        </form>
      ) : mode === "update" ? (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label="Название"
              {...register("name")}
              defaultValue={channelData?.name}
            />

            <Input
              label="Имя телеграм"
              {...register("userName")}
              defaultValue={channelData?.userName}
              placeholder="user_name_telegram"
            />

            <Input
              label="Описание"
              type="textarea"
              {...register("description")}
              defaultValue={channelData?.description}
            />

            <Input
              label="Ключевые слова"
              type="textarea"
              {...register("keywords")}
              defaultValue={
                Array.isArray(channelData?.keywords)
                  ? channelData?.keywords.join(" ")
                  : channelData?.keywords
              }
              placeholder="через пробел без запятых"
            />

            <CustomButton type="submit">Редактировать</CustomButton>
          </Flex>
        </form>
      ) : (
        <Flex $align="center" $gap={20}>
          <PageText $fontSize={25}>Подтвердите действие</PageText>

          <Flex $direction="row" $justify="center" $gap={30}>
            <CustomButton type="button" onClick={handleDelete}>
              Удалить
            </CustomButton>

            <CustomButton type="button" onClick={onClose}>
              Отмена
            </CustomButton>
          </Flex>
        </Flex>
      )}
    </ModalWindow>
  );
};

export default ChannelModal;
