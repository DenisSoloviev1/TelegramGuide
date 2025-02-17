import { useEffect, useState } from "react";
import { IStatistics } from "../model";
import { getStatisticsChannels } from "../api";
import toast from "react-hot-toast";

export const useGetStatisticsChannels = () => {
  const [statisticsChannels, setStatisticsChannels] = useState<IStatistics>({
    today: 0,
    yesterday: 0,
    allTime: 0,
  });
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
        toast.error("Статистика каналов не загружена");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatisticsChannels();
  }, []);

  return { statisticsChannels, isLoading, isError };
};
