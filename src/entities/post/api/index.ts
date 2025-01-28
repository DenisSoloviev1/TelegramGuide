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
 * Получение подробной информации о посте.
 * @param id - id нужного поста.
 * @returns Promise с результатом операции.
 */
export const getPostById = async (id: IPost["id"]): Promise<IPost> => {
  try {
    const response = await apiRequest<{ post: IPost }>(
      "GET",
      "/posts/get",
      undefined,
      { id }
    );

    return response.post;
  } catch (error) {
    console.error("Ошибка при получении информации о посте:", error);
    throw new Error("Ошибка при получении информации о посте.");
  }
};

/**
 * Редактирование поста.
 * @param data - параметры редактируемого поста (изображение, заголовок, текст).
 * @param id - id редактируемого поста.
 * @returns Promise с результатом операции.
 */
export const updatePost = async (
  data: IPost,
  id: IPost["id"]
): Promise<IPost> => {
  try {
    const response = await apiRequest<{ post: IPost }>(
      "POST",
      `/posts/update?id=${id}`,
      data
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
export const deletePost = async (id: IPost["id"]): Promise<boolean> => {
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
