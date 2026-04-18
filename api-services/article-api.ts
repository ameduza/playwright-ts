import { APIRequestContext } from "@playwright/test";
import { ArticleResponse, ArticleRequest, Article } from "../types/article-type";
import { BaseRequest } from "./baseRequest";


export class ArticleAPI {
    private request: BaseRequest;
    private createdSlugs: string[] = [];

    constructor(request: APIRequestContext) {
        this.request = new BaseRequest(request);;
    }

    async createArticle(articleRequest: ArticleRequest): Promise<ArticleResponse> {
        const response = await this.request.post({
            url: 'http://localhost:8000/api/articles',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxODA3ODkzMTMyLCJpYXQiOjE3NzYzNTcxMzIsImp0aSI6ImU0YzZmNTE0MjhmOTRkMmE4ZDMwNWMxZDNhYmU0MDAyIiwidXNlcl9pZCI6MX0.8lJy2S4aYTpjeV9xnZaMvF_FL7rSLGWnJewQuWzJV3Q',
            body: { article: articleRequest },
        });

        const articleResponse = (await response.json() as ArticleResponse);
        this.createdSlugs.push(articleResponse.article.slug);
        return articleResponse;
    }

    async deleteArticleBySlug(slug: string): Promise<void> {
        await this.request.delete({
            url: `http://localhost:8000/api/articles/${slug}`,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxODA3ODkzMTMyLCJpYXQiOjE3NzYzNTcxMzIsImp0aSI6ImU0YzZmNTE0MjhmOTRkMmE4ZDMwNWMxZDNhYmU0MDAyIiwidXNlcl9pZCI6MX0.8lJy2S4aYTpjeV9xnZaMvF_FL7rSLGWnJewQuWzJV3Q',
        });
    }

    async cleanUpArticles(): Promise<void> {
        for (const slug of this.createdSlugs) {
            await this.deleteArticleBySlug(slug);
        }
        this.createdSlugs = [];
    }
}