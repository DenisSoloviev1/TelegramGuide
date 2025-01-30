import { useEffect, useState } from "react";
import { IChannel } from "../model";
import { getChannels } from "../api";
import toast from "react-hot-toast";

export const useGetChannels = (
  take: number,
  skip: number,
  categoryId?: IChannel["categoryId"],
  search?: string
) => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      setIsLoading(true);
      try {
        const response = await getChannels(take, skip, categoryId, search);
        setChannels(response);
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

    if (categoryId !== undefined) {
      fetchChannels();
    }
  }, [take, skip, categoryId, search]); // Зависимости для повторного запроса при изменении параметров

  return { channels, isLoading, isError };
};
