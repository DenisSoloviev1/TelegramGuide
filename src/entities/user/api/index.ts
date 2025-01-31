import { apiRequest } from "@/shared/config";
import { IAuth, IUser } from "../model";
import { Roles } from "@/shared/types";

/**
 * Авторизация.
 * @param data - параметры авторизации (логин, пароль).
 * @returns Promise с результатом операции.
 */
export const authUser = async (
  data: IAuth
): Promise<{ auth: IUser["auth"]; role: Roles }> => {
  try {
    const response = await apiRequest<{ auth: IUser["auth"]; role: Roles }>(
      "POST",
      "/auth/login",
      "", //пустой токен авторизации
      data
    );

    return response;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw new Error("Ошибка авторизации.");
  }
};
