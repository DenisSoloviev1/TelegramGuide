import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ModalWindow, Flex, Input, CustomButton } from "@/shared/ui";
import toast from "react-hot-toast";
import { addPost, deletePosts, IPost, updatePosts } from "@/entities/post";
import { isMobile } from "@/shared/lib";
import { PageText } from "@/pages/style";

interface PostModalProps {
  mode: "add" | "update" | "delete";
  show: boolean;
  onClose: () => void;
  postData?: IPost; // Для редактирования и удаления
}

const PostModal: React.FC<PostModalProps> = ({
  mode,
  show,
  onClose,
  postData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPost>({
    defaultValues: postData || {},
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        reset((prev) => ({ ...prev, base64: base64String.split(",")[1] }));
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
        await updatePosts(data, postData?.id);
        toast.success("Пост отредактирован");
      }
      onClose();
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка, попробуйте снова");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePosts(postData?.id);
      toast.success("Пост удалён");
      onClose();
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
              {...register("base64", { required: "Изображение обязателено" })}
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
          <PageText $fontSize={25}>Вы уверены, что хотите удалить этот пост?</PageText>

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
