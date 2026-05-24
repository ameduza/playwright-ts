import { Article } from '../types/article-type';

export class TestContext {
  readonly articles: Article[] = [];

  addArticle(article: Article): void {
    if (!this.articles.some((a) => a.slug === article.slug)) {
      this.articles.push(article);
    }
  }
}
