import { apiRequest } from "@/shared/config";
import { IPost } from "../model";

/**
 * Создание поста.
 * @param img - ссылка на фотогрфию.
 * @param date - дата создания.
 * @param text - содержание.
 * @returns Promise с результатом операции.
 */
export const addPosts = async (
  img: IPost["img"],
  date: IPost["date"],
  text: IPost["text"]
): Promise<IPost[]> => {
  const response = await apiRequest<IPost[]>("POST", `/api/posts`, {
    img,
    date,
    text,
  });

  if (!response.success) {
    throw new Error(
      response.error || "Ошибка при cоздании поста."
    );
  }

  return response.data;
};

/**
 * Получение постов.
 * @returns Promise с результатом операции.
 */
export const getPosts = async (): Promise<IPost[]> => {
  const response = await apiRequest<IPost[]>("GET", `/api/posts`);

  if (!response.success) {
    throw new Error(
      response.error || "Ошибка при получении постов."
    );
  }
  
  return response.data;
};

/**
 * Редактирование поста.
 * @param id - id редактируемого поста.
 * @param img - ссылка на фотогрфию.
 * @param date - дата создания.
 * @param text - содержание.
 * @returns Promise с результатом операции.
 */
export const editPosts = async (
  id: IPost["id"],
  img: IPost["img"],
  date: IPost["date"],
  text: IPost["text"]
): Promise<IPost[]> => {
  const response = await apiRequest<IPost[]>("POST", `/api/posts`, {
    id,
    img,
    date,
    text,
  });

  if (!response.success) {
    throw new Error(
      response.error || "Ошибка при редактировании поста."
    );
  }

  return response.data;
};

/**
 * Удаление поста.
 * @param id - id удаляемого поста.
 * @returns Promise с результатом операции.
 */
export const deletePosts = async (id: IPost["id"]): Promise<IPost[]> => {
  const response = await apiRequest<IPost[]>("POST", `/api/posts`, {
    id,
  });

  if (!response.success) {
    throw new Error(
      response.error || "Ошибка при удалении поста."
    );
  }

  return response.data;
};
