import { APIRequestContext, APIResponse } from '@playwright/test';
import { ArticleRequest } from '../types/article-type';
import { APIConfig } from '../utils/configs/api-config';
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
      url: APIConfig.articles,
      token,
      body: { article: articleRequest },
    });
  }

  async deleteArticleBySlug(token: string, slug: string): Promise<APIResponse> {
    return await this.request.delete({
      url: APIConfig.articleBySlug(slug),
      token,
    });
  }
}
