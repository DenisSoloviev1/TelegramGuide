export type NavItem = {
  [key: string]: string;
};

export enum Routes {
  NOTFOUND = "*",
  HOME = "/",
  AUTH = "/auth",
  POSTS = "/posts",
  COLLECTIONS = "/collections",
  NOMINATIONS = "/nominations",
}

export const NavItem: NavItem = {
  "/": "главная",
  "/posts": "публикации",
  "/collections": "подборки",
  "/nominations": "номинации",
};
