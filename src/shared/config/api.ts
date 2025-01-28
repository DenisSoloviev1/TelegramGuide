import axios, { AxiosRequestConfig, Method } from "axios";
import { baseUrl } from ".";

/**
 * Универсальная функция для выполнения HTTP-запросов.
 * @param method - HTTP-метод (GET, POST, PUT, DELETE).
 * @param endpoint - Конечный путь API.
 * @param data - Тело запроса (если нужно).
 * @param params - URL-параметры (опционально).
 * @returns Promise с данными ответа от сервера.
 */
export const apiRequest = async <T>(
  method: Method,
  endpoint: string,
  data?: object,
  params?: object
): Promise<T> => {
  try {
    // const token = localStorage.getItem("authToken");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4MDk4NjAxLCJleHAiOjE3MzgxODUwMDF9.7tZfDGi-MGTvHS_IhDrlAWzoehnr-Cv3csn6AMXJT3g";
    if (!token) {
      throw new Error("Токен авторизации отсутствует");
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${baseUrl}${endpoint}`, // Полный URL
      data, // Тело запроса
      params, // Если метод GET - параметры в URL
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    return response.data; // возвращаем данные из ответа
  } catch (error: any) {
    console.error(
      `Ошибка при запросе ${method} ${endpoint}:`,
      error.response?.data || error.message
    );
    throw error; // выбрасываем ошибку, чтобы ее можно было обработать выше
  }
};
