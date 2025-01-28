import { useEffect, useState } from "react";
import { ICategory } from "../model";
import { getCategories } from "../api";
import toast from "react-hot-toast";

export const useGetCategories = () => {
  const [categories, setСategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
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

    fetchPosts();
  }, []);

  return { categories, isLoading, isError };
};
