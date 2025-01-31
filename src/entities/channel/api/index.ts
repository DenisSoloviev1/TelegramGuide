import { apiRequest } from "@/shared/config";
import { IChannel, IStatistics } from "../model";

const auth = localStorage.getItem("auth") || "";

/**
 * Создание канала.
 * @param data - параметры категории (имя пользователя телеграмм, id категории, ключевые слова).
 * @returns Promise с результатом операции.
 */
export const addChannel = async (data: IChannel): Promise<IChannel> => {
  try {
    const response = await apiRequest<{ channel: IChannel }>(
      "POST",
      "/channel/create",
      auth,
      data
    );

    return response.channel;
  } catch (error) {
    console.error("Ошибка при создании канала:", error);
    throw new Error("Ошибка при создании канала.");
  }
};

/**
 * Получение каналов.
 * @param take - количество полученных каналов.
 * @param skip - пропущенные при получении.
 * @param categoryId - id категории, чтобы получить относящиеся к ней каналы.
 * @param search - текст введенный в строку поиска.
 * @returns Promise с результатом операции.
 */
export const getChannels = async (
  take: number,
  skip: number,
  categoryId?: number,
  search?: string
): Promise<IChannel[]> => {
  try {
    const response = await apiRequest<{ list: IChannel[] }>(
      "GET",
      "/channel/list",
      "", //пустой токен авторизации
      undefined,
      { take, skip, categoryId, search }
    );

    return response.list;
  } catch (error) {
    console.error("Ошибка при получении каналов:", error);
    throw new Error("Ошибка при получении каналов.");
  }
};

/**
 * Редактирование ключевых слов в канале.
 * @param keywords - ключевые слова.
 * @param id - id редактируемого канала.
 * @returns Promise с результатом операции.
 */
export const updateKeywordsChannel = async (
  keywords: IChannel["keywords"],
  id: IChannel["id"]
): Promise<IChannel> => {
  try {
    const response = await apiRequest<{ channel: IChannel }>(
      "POST",
      `/channel/keywords/update?id=${id}`,
      auth,
      { keywords: keywords }
    );

    return response.channel;
  } catch (error) {
    console.error("Ошибка при редактировании ключевых слов:", error);
    throw new Error("Ошибка при редактировании ключевых слов.");
  }
};

/**
 * Удаление канала.
 * @param id - id удаляемого канала.
 * @returns Promise с результатом операции.
 */
export const deleteChannel = async (id: IChannel["id"]): Promise<boolean> => {
  try {
    const response = await apiRequest<{ success: boolean }>(
      "POST",
      "/channel/delete",
      auth,
      undefined,
      { id }
    );

    return response.success;
  } catch (error) {
    console.error("Ошибка при удалении канала:", error);
    throw new Error("Ошибка при удалении канала.");
  }
};

/**
 * Получение статистики каналов.
 * @returns Promise с результатом операции.
 */
export const getStatisticsChannels = async (): Promise<IStatistics> => {
  try {
    const response = await apiRequest<{ statistics: IStatistics }>(
      "GET",
      "/statistics/channels"
    );

    return response.statistics;
  } catch (error) {
    console.error("Ошибка при получении статистики каналов:", error);
    throw new Error("Ошибка при получении статистики каналов.");
  }
};
