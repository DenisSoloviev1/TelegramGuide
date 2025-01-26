import axios, { AxiosRequestConfig, Method } from "axios";
import { baseUrl } from ".";

// /**
//  * Универсальный интерфейс ответа от сервера.
//  */
// export interface IResponse<T> {
//   data: T; // Тип данных, возвращаемых сервером.
//   success: boolean; // Указывает на успешность запроса.
//   error?: string; // Сообщение об ошибке, если запрос неуспешен.
// }

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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM3OTAxMzc0LCJleHAiOjE3Mzc5ODc3NzR9.y5h4Ruj7bn_0rvSPlAxkgm7DtPeoEgJHW0xJhhdRyaU"; // Токен

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
