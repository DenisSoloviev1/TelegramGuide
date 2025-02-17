import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ModalWindow, Flex, Input, CustomButton } from "@/shared/ui";
import toast from "react-hot-toast";
import { addPost, deletePost, IPost, updatePost } from "@/entities/post";
import { isMobile } from "@/shared/lib";
import { PageText } from "@/pages/style";

interface PostModalProps {
  mode: "add" | "update" | "delete";
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  postData?: IPost; // Для редактирования и удаления
}

const PostModal: React.FC<PostModalProps> = ({
  mode,
  show,
  onClose,
  onSuccess,
  postData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IPost>({
    defaultValues: postData || {},
  });

  const handleSuccess = () => {
    onSuccess?.(); // Вызываем onSuccess, если он передан
    onClose(); // Закрываем модалку
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setValue("base64", base64String.split(",")[1], {
          shouldValidate: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit: SubmitHandler<IPost> = async (data) => {
    try {
      if (mode === "add") {
        await toast.promise(addPost(data), {
          loading: "Создание поста...",
          success: "Пост создан",
          error: "Пост не создан",
        });
      } else {
        await toast.promise(updatePost(data, postData?.id), {
          loading: "Редактирование поста...",
          success: "Пост отредактирован",
          error: "Пост не отредактирован",
        });
      }
      handleSuccess();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await toast.promise(deletePost(postData?.id), {
        loading: "Удаление поста...",
        success: "Пост удален",
        error: "Пост не удален",
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
      {mode === "add" || mode === "update" ? (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label="Заголовок"
              {...register("name", { required: "Заголовок обязателен" })}
              defaultValue={postData?.name}
              error={errors.name?.message}
            />
            <Input
              label="Текст"
              type="textarea"
              {...register("text", { required: "Текст обязателен" })}
              defaultValue={postData?.text}
              error={errors.text?.message}
            />
            <Input
              label="Изображение"
              type="file"
              onChange={handleFileChange}
              error={errors.base64?.message}
            />

            <CustomButton type="submit">
              {mode === "add" ? "Создать" : "Редактировать"}
            </CustomButton>
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

export default PostModal;
