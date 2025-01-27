import { useEffect, useState } from "react";
import { IPost } from "../model";
import { getPostById } from "../api";
import toast from "react-hot-toast";

export const useGetPostById = (postId: IPost["id"]) => {
  const [post, setPost] = useState<IPost>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPostById = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response);
        if (response === null) {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error("Ошибка загрузки поста");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostById();
  }, []);

  return { post, isLoading, isError };
};
