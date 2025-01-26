import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addPost, IPost, Post } from "@/entities/post";
import { ImageBackground, PageTitle } from "../style";
import {
  CalendarSvg,
  Flex,
  Grid,
  ModalWindow,
  CustomButton,
  Input,
  NoDataSvg,
} from "@/shared/ui";
import { useAuthStore } from "@/entities/user";
import { RolesDict } from "@/shared/types";
import { PublicDate, Image, PostName, Text } from "@/entities/post/ui/style";
import { formatterDate, isMobile } from "@/shared/lib";
import toast, { Toaster } from "react-hot-toast";
import { useGetPost } from "@/entities/post/hooks";
import { Skeleton } from "@mui/material";
import { baseUrl } from "@/shared/config";

export const Posts: React.FC = () => {
  const { role } = useAuthStore();
  const { posts, isLoading, isError } = useGetPost();
  const [selectedPost, setSelectedPost] = useState<IPost>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showAddPost, setShowAddPost] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPost>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const content = base64String.split(",")[1]; // Берём всё после запятой
        setImageBase64(content);
      };
      reader.readAsDataURL(file); // Конвертируем файл в строку Base64
    }
  };

  const onSubmit: SubmitHandler<IPost> = async (data: IPost) => {
    try {
      const postData = {
        ...data,
        base64: imageBase64, // Передаем строку Base64 вместо файла
      };
      await addPost(postData);
      toast.success("Пост создан");
    } catch (error) {
      console.error(error);
      toast.error("Ошибка, попробуйте снова");
    }
    reset(); // Очистка формы после отправки
    setShowAddPost(false); // Закрываем модалку после успешной отправки
  };

  return (
    <>
      <Toaster />

      <Flex $direction={"row"} $align={"center"} $gap={20}>
        <PageTitle>Посты</PageTitle>

        {role === RolesDict.ADMIN && (
          <CustomButton onClick={() => setShowAddPost(!showAddPost)}>
            добавить
          </CustomButton>
        )}
      </Flex>

      {isError ? (
        <Flex $align="center">
          <ImageBackground>
            <NoDataSvg />
          </ImageBackground>
        </Flex>
      ) : (
        <Grid $column={3}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  animation="wave"
                  variant="rounded"
                  width={330}
                  height={390}
                  style={{ borderRadius: "16px" }}
                />
              ))
            : posts?.map((post) => (
                <Post
                  key={post.id}
                  post={{
                    id: post.id,
                    name: post.name,
                    text: post.text,
                    createdAt: post.createdAt,
                    imageId: post.imageId,
                  }}
                  onClick={() => {
                    setSelectedPost(post);
                    setShowMore(true);
                  }}
                />
              ))}
        </Grid>
      )}

      {/* Модалка для добавления нового поста */}
      <ModalWindow
        show={showAddPost}
        onClick={() => setShowAddPost(!showAddPost)}
        width={isMobile ? "90%" : "40%"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label={"Заголовок"}
              {...register("name", { required: "Заголовок обязателен" })}
              error={errors.name?.message}
            />

            <Input
              label={"Текст"}
              type="textarea"
              {...register("text", { required: "Текст обязателен" })}
              error={errors.text?.message}
            />

            <Input
              label={"Изображение"}
              type="file"
              {...register("base64", { required: "Изображение обязателено" })}
              onChange={handleFileChange} // Добавляем наш обработчик
              error={errors.base64?.message}
            />

            <CustomButton>создать</CustomButton>
          </Flex>
        </form>
      </ModalWindow>

      {/* Модалка для просмотра поста */}
      <ModalWindow
        show={showMore}
        onClick={() => setShowMore(!showMore)}
        width={!isMobile ? "50%" : "90%"}
      >
        <PublicDate>
          <CalendarSvg />
          {selectedPost?.createdAt && formatterDate(selectedPost.createdAt)}
        </PublicDate>

        <PostName>{selectedPost?.name}</PostName>

        <Image $height={"80%"} style={{ overflow: "initial" }}>
          <img
            src={`${baseUrl}/media/get/${selectedPost?.imageId}`}
            alt="post_img"
          />
        </Image>

        <Text $fontSize={20}>{selectedPost?.text}</Text>
      </ModalWindow>
    </>
  );
};

export default Posts;
