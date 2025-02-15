import { useEffect, useState } from "react";
import { IChannel } from "../model";
import { getChannelById } from "../api";
import toast from "react-hot-toast";

export const useGetChannelById = (channelId: IChannel["id"]) => {
  const [channel, setChannel] = useState<IChannel>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchChannelById = async () => {
    setIsLoading(true);

    try {
      const response = await getChannelById(channelId);
      setChannel(response);
      if (response === null) {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error("Ошибка загрузки канала");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для повторной загрузки данных
  const refetch = async () => {
    await fetchChannelById();
  };

  // Загрузка каналов при монтировании компонента
  useEffect(() => {
    refetch();
  }, []);

  return { channel, isLoading, isError, refetch };
};
