import { APIRequestContext, APIResponse } from '@playwright/test';
import { ArticleRequest } from '../types/article-type';
import { BaseRequest } from './baseRequest';

export class ArticlesController {
  private request: BaseRequest;

  constructor(request: APIRequestContext) {
    this.request = new BaseRequest(request);
  }

  async createArticle(
    token: string,
    articleRequest: ArticleRequest,
  ): Promise<APIResponse> {
    return await this.request.post({
      url: 'http://localhost:8000/api/articles',
      token,
      body: { article: articleRequest },
    });
  }

  async deleteArticleBySlug(token: string, slug: string): Promise<APIResponse> {
    return await this.request.delete({
      url: `http://localhost:8000/api/articles/${slug}`,
      token,
    });
  }
}
