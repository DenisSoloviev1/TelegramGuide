import { useEffect, useState } from "react";
import { IChannel } from "../model";
import { getChannels } from "../api";
import toast from "react-hot-toast";

export const useGetChannels = (channelId: IChannel["id"]) => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPostById = async () => {
      try {
        const response = await getChannels(10, 0, channelId);
        setChannels(response);
        if (response === null) {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error("Ошибка загрузки каналов");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostById();
  }, []);

  return { channels, isLoading, isError };
};
