export type NavItem = {
  [key: string]: string;
};

export enum Path {
  NOTFOUND = "*",
  HOME = "/",
  AUTH = "/auth",
  POSTS = "/posts",
  POSTDETAILS ="/posts/:postId",
  COLLECTIONS = "/collections",
  NOMINATIONS = "/nominations",
}

export const NavItem: NavItem = {
  "/": "главная",
  "/posts": "публикации",
  "/collections": "подборки",
  "/nominations": "номинации",
};
