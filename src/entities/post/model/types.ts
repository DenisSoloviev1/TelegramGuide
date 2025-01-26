export interface IPost {
  id?: number; // ID поста, может быть необязательным при создании
  name: string; // Заголовок поста
  createdAt?: string; // Дата создания поста, приходит с сервера
  text: string; // Текст поста
  base64?: string; // Base64-строка изображения, используется при отправке
  imageId?: string; // ID изображения, приходит с сервера
}
