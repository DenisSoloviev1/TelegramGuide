import { apiRequest } from "@/shared/config";
import { IChannel, IStatistics } from "../model";

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
 * @param id - id категории, чтобы получить относящиеся к ней каналы.
 * @param search - текст введенный в строку поиска.
 * @returns Promise с результатом операции.
 */
export const getChannels = async (
  take: number,
  skip: number,
  id?: number,
  search?: string
): Promise<IChannel[]> => {
  try {
    const response = await apiRequest<{ list: IChannel[] }>(
      "GET",
      "/channel/list",
      undefined,
      { take, skip, id, search }
    );

    return response.list;
  } catch (error) {
    console.error("Ошибка при получении каналов:", error);
    throw new Error("Ошибка при получении каналов.");
  }
};

/**
 * Редактирование ключевых слов в канале.
 * @param data - ключевые слова.
 * @param id - id редактируемого канала.
 * @returns Promise с результатом операции.
 */
export const updateKeywordsChannel = async (
  data: IChannel["keywords"],
  id: IChannel["id"]
): Promise<IChannel> => {
  try {
    const response = await apiRequest<{ channel: IChannel }>(
      "POST",
      `/channel/keywords/update?id=${id}`,
      data
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
    const response = await apiRequest<IStatistics>(
      "GET",
      "/statistics/channels"
    );

    return response;
  } catch (error) {
    console.error("Ошибка при получении статистики каналов:", error);
    throw new Error("Ошибка при получении статистики каналов.");
  }
};
