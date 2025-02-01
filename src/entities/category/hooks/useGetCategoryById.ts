import { useEffect, useState } from "react";
import { ICategory } from "../model";
import { getCategoryById } from "../api";
import toast from "react-hot-toast";

export const useGetCategoryById = (categoryId: ICategory["id"]) => {
  const [category, setCategory] = useState<ICategory>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCategoryById = async () => {
    setIsLoading(true);

    try {
      const response = await getCategoryById(categoryId);
      setCategory(response);
      if (response === null) {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error("Ошибка загрузки категории");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для повторной загрузки данных
  const refetch = async () => {
    await fetchCategoryById();
  };

  // Загрузка каналов при монтировании компонента
  useEffect(() => {
    refetch();
  }, []);

  return { category, isLoading, isError, refetch };
};
