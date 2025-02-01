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
        await addPost(data);
        toast.success("Пост создан");
      } else {
        await updatePost(data, postData?.id);
        toast.success("Пост отредактирован");
      }
      handleSuccess();
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка, попробуйте снова");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postData?.id);
      toast.success("Пост удален");
      handleSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении поста");
    }
  };

  return (
    <ModalWindow show={show} onClick={onClose} width={isMobile ? "90%" : "40%"}>
      {mode === "add" || mode === "update" ? (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label="Заголовок"
              {...register("name", { required: "Заголовок обязателен" })}
              error={errors.name?.message}
            />
            <Input
              label="Текст"
              type="textarea"
              {...register("text", { required: "Текст обязателен" })}
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
