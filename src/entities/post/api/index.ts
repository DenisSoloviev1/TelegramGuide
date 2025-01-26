import { apiRequest } from "@/shared/config";
import { IPost } from "../model";

/**
 * Создание поста.
 * @param data - параметры поста (изображение, заголовок, текст).
 * @returns Promise с результатом операции.
 */
export const addPost = async (data: IPost): Promise<IPost> => {
  try {
    const response = await apiRequest<{ post: IPost }>(
      "POST",
      "/posts/create",
      data
    );

    return response.post;
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
    throw new Error("Ошибка при создании поста.");
  }
};

/**
 * Получение постов.
 * @param take - количество полученных постов.
 * @param skip - пропущенные при получении.
 * @returns Promise с результатом операции.
 */
export const getPosts = async (
  take: number,
  skip: number
): Promise<IPost[]> => {
  try {
    const response = await apiRequest<{ list: IPost[] }>(
      "GET",
      "/posts/list",
      undefined,
      { take, skip }
    );

    return response.list;
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    throw new Error("Ошибка при получении постов.");
  }
};

/**
 * Редактирование поста.
 * @param id - id редактируемого поста.
 * @param data - параметры редактируемого поста (изображение, заголовок, текст).
 * @returns Promise с результатом операции.
 */
export const updatePosts = async (
  id: IPost["id"],
  data: IPost
): Promise<IPost> => {
  try {
    const response = await apiRequest<{ post: IPost }>(
      "POST",
      "/posts/update",
      data,
      {
        id,
      }
    );

    return response.post;
  } catch (error) {
    console.error("Ошибка при редактировании поста:", error);
    throw new Error("Ошибка при редактировании поста.");
  }
};

/**
 * Удаление поста.
 * @param id - id удаляемого поста.
 * @returns Promise с результатом операции.
 */
export const deletePosts = async (id: IPost["id"]): Promise<boolean> => {
  try {
    const response = await apiRequest<boolean>(
      "POST",
      "/posts/delete",
      undefined,
      { id }
    );

    return response;
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    throw new Error("Ошибка при удалении поста.");
  }
};
