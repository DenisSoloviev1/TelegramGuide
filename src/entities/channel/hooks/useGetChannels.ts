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
        if (skip === 0) {
          // Если skip = 0, это новая загрузка (например, при refetch или изменении categoryId/search)
          setChannels(response);
        } else {
          // Иначе добавляем новые каналы к уже загруженным
          setChannels((prevChannels) => [...prevChannels, ...response]);
        }
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

  // Функция для повторной загрузки данных
  const refetch = async () => {
    setSkip(0);
    await fetchChannels(20, 0); 
  };

  // Загрузка каналов при монтировании компонента или изменении categoryId/search
  useEffect(() => {
    refetch(); 
  }, [categoryId, search]);

  // Функция для загрузки следующей порции каналов
  const loadMoreChannels = async (take: number) => {
    const newSkip = skip + take;
    await fetchChannels(take, newSkip);
    setSkip(newSkip);
  };

  return { channels, isLoading, isError, loadMoreChannels, refetch };
};