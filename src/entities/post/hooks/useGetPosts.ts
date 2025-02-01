import { useState, useEffect } from "react";
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
        if (skip === 0) {
          // Если skip = 0, это новая загрузка
          setPosts(response);
        } else {
          // Иначе добавляем новые посты к уже загруженным
          setPosts((prevPosts) => [...prevPosts, ...response]); // Добавляем новые посты к уже загруженным
        }
      }
      if (response === null) {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error("Ошибка загрузки постов");
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для повторной загрузки данных
  const refetch = async () => {
    setSkip(0);
    await fetchPosts(20, 0);
  };

  // Загрузка постов при монтировании компонента
  useEffect(() => {
    refetch();
  }, []);

  // Функция для загрузки следующей порции постов
  const loadMorePosts = async (take: number) => {
    const newSkip = skip + take;
    await fetchPosts(take, newSkip);
    setSkip(newSkip);
  };

  return { posts, isLoading, isError, loadMorePosts, refetch };
};
