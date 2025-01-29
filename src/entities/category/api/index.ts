import { apiRequest } from "@/shared/config";
import { ICategory } from "../model";

/**
 * Создание категории.
 * @param data - параметры категории (изображение, название).
 * @returns Promise с результатом операции.
 */
export const addCategory = async (data: ICategory): Promise<ICategory> => {
  try {
    const response = await apiRequest<{ post: ICategory }>(
      "POST",
      "/category/create",
      data
    );

    return response.post;
  } catch (error) {
    console.error("Ошибка при создании категории:", error);
    throw new Error("Ошибка при создании категории.");
  }
};

/**
 * Получение категорий.
 * @returns Promise с результатом операции.
 */
export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await apiRequest<{ list: ICategory[] }>(
      "GET",
      "/category/list"
    );

    return response.list;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    throw new Error("Ошибка при получении категорий.");
  }
};

/**
 * Получение подробной информации о категории.
 * @param id - id нужной категории.
 * @returns Promise с результатом операции.
 */
export const getCategoryById = async (id: ICategory["id"]): Promise<ICategory> => {
  try {
    const response = await apiRequest<{ category: ICategory }>(
      "GET",
      "/category/get",
      undefined,
      { id }
    );

    return response.category;
  } catch (error) {
    console.error("Ошибка при получении информации о категории:", error);
    throw new Error("Ошибка при получении информации о категории.");
  }
};

/**
 * Редактирование категории.
 * @param data - параметры редактируемой категории (изображение, название).
 * @param id - id редактируемой категории.
 * @returns Promise с результатом операции.
 */
export const updateCategory = async (
  data: ICategory,
  id: ICategory["id"]
): Promise<ICategory> => {
  try {
    const response = await apiRequest<{ category: ICategory }>(
      "POST",
      `/category/update?id=${id}`,
      data
    );

    return response.category;
  } catch (error) {
    console.error("Ошибка при редактировании категории:", error);
    throw new Error("Ошибка при редактировании категории.");
  }
};

/**
 * Удаление категории.
 * @param id - id удаляемой категории.
 * @returns Promise с результатом операции.
 */
export const deleteCategory = async (id: ICategory["id"]): Promise<boolean> => {
  try {
    const response = await apiRequest<{success: boolean}>(
      "POST",
      "/category/delete",
      undefined,
      { id }
    );

    return response.success;
  } catch (error) {
    console.error("Ошибка при удалении категории:", error);
    throw new Error("Ошибка при удалении категории.");
  }
};
