import { APIRequestContext } from '@playwright/test';
import { ArticleResponse, ArticleRequest } from '../types/article-type';
import { ArticlesController } from '../api-services/articles-controller';

export class ArticleApiStep {
  private controller: ArticlesController;
  private createdSlugs: string[] = [];
  private token: string;

  constructor(request: APIRequestContext, token: string) {
    this.controller = new ArticlesController(request);
    this.token = token;
  }

  async createArticle(
    articleRequest: ArticleRequest,
  ): Promise<ArticleResponse> {
    const response = await this.controller.createArticle(
      this.token,
      articleRequest,
    );
    const articleResponse = (await response.json()) as ArticleResponse;
    this.createdSlugs.push(articleResponse.article.slug);
    return articleResponse;
  }

  async cleanUpArticles(): Promise<void> {
    for (const slug of this.createdSlugs) {
      await this.controller.deleteArticleBySlug(this.token, slug);
    }
    this.createdSlugs = [];
  }
}
