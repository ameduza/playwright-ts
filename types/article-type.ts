export type ArticleRequest = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type ArticleResponse = {
  article: Article;
};

export type Article = {
  title: string;
  slug: string;
  description: string;
  body: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: string[];
};

type Author = {
  username: string;
  email: string;
  bio: string;
  image: string | null;
  following: boolean;
};
