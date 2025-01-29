import { useEffect, useState } from "react";
import { ICategory } from "../model";
import { getCategoryById } from "../api";
import toast from "react-hot-toast";

export const useGetCategoryById = (categoryId: ICategory["id"]) => {
  const [category, setCategory] = useState<ICategory>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategoryById = async () => {
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

    fetchCategoryById();
  }, []);

  return { category, isLoading, isError };
};
