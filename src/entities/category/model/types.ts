export interface ICategory {
  id?: number; // ID категории, может быть необязательным при создании
  name: string; // Заголовок категории
  base64?: string; // Base64-строка изображения, используется при отправке
  imageId: string; // ID изображения, приходит с сервера
}
