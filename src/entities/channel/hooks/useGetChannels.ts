import { useEffect, useState } from "react";
import { IChannel } from "../model";
import { getChannels } from "../api";
import toast from "react-hot-toast";

export const useGetChannels = (
  categoryId?: IChannel["categoryId"],
  search?: string
) => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [skip, setSkip] = useState(0); // Текущее количество пропущенных постов

  const fetchChannels = async (take: number, skip: number) => {
    setIsLoading(true);
    try {
      const response = await getChannels(take, skip, categoryId, search);
      if (response) {
        setChannels((prevPosts) => [...prevPosts, ...response]); // Добавляем новые посты к уже загруженным
      }
      if (response === null) {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error("Ошибка загрузки каналов");
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка постов при монтировании компонента
  useEffect(() => {
    fetchChannels(20, 0);
  }, []);

  // Функция для загрузки следующей порции постов
  const loadMoreChannels = async (take: number) => {
    const newSkip = skip + take;
    await fetchChannels(take, newSkip);
    setSkip(newSkip);
  };

  return { channels, isLoading, isError, loadMoreChannels };
};
