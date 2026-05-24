import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { ArticleResponse, ArticleRequest, Article } from '../types/article-type';
import { ArticlesController } from '../api-services/articles-controller';
import { TestContext } from '../fixtures/test-context';

export class ArticleApiStep {
  private controller: ArticlesController;
  private token: string;
  private context: TestContext;

  constructor(request: APIRequestContext, token: string, context: TestContext) {
    this.controller = new ArticlesController(request);
    this.token = token;
    this.context = context;
  }

  async createArticleNoStatusCheck(
    articleRequest: ArticleRequest,
  ): Promise<APIResponse> {
    return await this.controller.postArticle(
      this.token,
      articleRequest,
      false,
    );
  }

  async createArticle(
    articleRequest: ArticleRequest,
  ): Promise<ArticleResponse> {
    const response = await this.createArticleNoStatusCheck(articleRequest);
    expect(response.status()).toBe(201);
    const articleResponse = (await response.json()) as ArticleResponse;
    this.context.addArticle(articleResponse.article);
    return articleResponse;
  }

  async getArticleBySlug(slug: string): Promise<Article> {
    const response = await this.controller.getArticleBySlug(this.token, slug);
    expect(response.status()).toBe(200);
    const articleResponse = (await response.json()) as ArticleResponse;
    return articleResponse.article;
  }

  async cleanUpArticles(): Promise<void> {
    for (const article of this.context.articles) {
      await this.controller.deleteArticleBySlug(this.token, article.slug, false);
    }
  }
}
