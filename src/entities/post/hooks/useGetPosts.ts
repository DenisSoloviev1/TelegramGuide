import { useEffect, useState } from "react";
import { IPost } from "../model";
import { getPosts } from "../api";
import toast from "react-hot-toast";

export const useGetPost = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await getPosts(10, 0);//взято 10, пропущенно 0
        setPosts(response);
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error("Ошибка загрузки постов");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading, isError };
};
