import { useEffect, useState } from "react";
import { IStatistics } from "../model";
import { getStatisticsChannels } from "../api";
import toast from "react-hot-toast";

export const useGetStatisticsChannels = () => {
  const [statisticsChannels, setStatisticsChannels] = useState<IStatistics>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchStatisticsChannels = async () => {
      try {
        const response = await getStatisticsChannels();
        setStatisticsChannels(response);
        if (response === null) {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error("Ошибка загрузки статистики каналов");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatisticsChannels();
  }, []);

  return { statisticsChannels, isLoading, isError };
};
