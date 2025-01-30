import { useState } from "react";
import { IPost } from "../model";
import { getPosts } from "../api";
import toast from "react-hot-toast";

export const useGetPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [skip, setSkip] = useState(0); // Текущее количество пропущенных постов

  // Функция для загрузки постов
  const fetchPosts = async (take: number, skip: number) => {
    setIsLoading(true);
    try {
      const response = await getPosts(take, skip);
      if (response) {
        setPosts((prevPosts) => [...prevPosts, ...response]); // Добавляем новые посты к уже загруженным
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error("Ошибка загрузки постов");
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для загрузки следующей порции постов
  const loadMorePosts = async (take: number) => {
    await fetchPosts(take, skip);
    setSkip((prevSkip) => prevSkip + take); // Увеличиваем количество пропущенных постов
  };

  return { posts, isLoading, isError, loadMorePosts };
};