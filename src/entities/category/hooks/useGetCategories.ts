import { useEffect, useState } from "react";
import { ICategory } from "../model";
import { getCategories } from "../api";
import toast from "react-hot-toast";

export const useGetCategories = () => {
  const [categories, setСategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const response = await getCategories();
      setСategories(response);
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error("Ошибка загрузки категорий");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для повторной загрузки данных
  const refetch = async () => {
    await fetchCategories();
  };

  // Загрузка каналов при монтировании компонента
  useEffect(() => {
    refetch();
  }, []);

  return { categories, isLoading, isError, refetch };
};
