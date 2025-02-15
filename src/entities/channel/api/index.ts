import { apiRequest } from "@/shared/config";
import { IChannel, IStatistics } from "../model";

const auth = localStorage.getItem("auth") || "";

/**
 * Создание канала.
 * @param data - параметры канала (имя пользователя телеграмм, id категории, ключевые слова).
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
 * Получение подробной информации о канале.
 * @param id - id нужного канала.
 * @returns Promise с результатом операции.
 */
export const getChannelById = async (id: IChannel["id"]): Promise<IChannel> => {
  try {
    const response = await apiRequest<{ channel: IChannel }>(
      "GET",
      "/channel/get",
      "", //пустой токен авторизации
      undefined,
      { id }
    );

    return response.channel;
  } catch (error) {
    console.error("Ошибка при получении информации о канале:", error);
    throw new Error("Ошибка при получении информации о канале.");
  }
};

/**
 * Редактирование каналa.
 * @param data - параметры канала (имя пользователя телеграмм, название, ключевые слова, описание).
 * @param id - id редактируемого канала.
 * @returns Promise с результатом операции.
 */
export const updateChannel = async (
  data: IChannel,
  id: IChannel["id"]
): Promise<IChannel> => {
  try {
    const response = await apiRequest<{ channel: IChannel }>(
      "POST",
      `/channel/update?id=${id}`,
      auth,
      data
    );

    return response.channel;
  } catch (error) {
    console.error("Ошибка при редактировании канала:", error);
    throw new Error("Ошибка при редактировании канала.");
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
