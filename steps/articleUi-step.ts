import { Page } from '@playwright/test';
import { ArticleLocators } from '../utils/UiLocators/ArticleLocators';
import { CommonLocators } from '../utils/UiLocators/CommonLocators';
import { ArticleRequest, ArticleResponse } from '../types/article-type';
import { TestContext } from '../fixtures/test-context';
import { APIConfig } from '../utils/configs/api-config';
import { UIConfig } from '../utils/configs/ui-config';
import { matchesResponse } from '../utils/response-helper';
import { BaseUiStep } from './baseUi-step';

export class ArticleUiStep extends BaseUiStep {
  private articleLocators: ArticleLocators;
  private commonLocators: CommonLocators;
  private context: TestContext;

  constructor(page: Page, context: TestContext) {
    super(page);
    this.articleLocators = new ArticleLocators(page);
    this.commonLocators = new CommonLocators(page);
    this.context = context;
  }

  async createArticle(article: ArticleRequest): Promise<string> {
    await this.gotoEditor();
    await this.fillArticleForm(article);

    const responsePromise = this.page.waitForResponse(matchesResponse(APIConfig.articles, 'POST'));
    await this.submitArticleForm();
    const responseBody = await (await responsePromise).json() as ArticleResponse;
    const slug: string = responseBody.article.slug;
    this.context.addArticle(responseBody.article);
    return slug;
  }

  async updateArticle(slug: string, article: ArticleRequest): Promise<string> {
    await this.gotoEditorForSlug(slug);
    await this.fillArticleForm(article);

    const responsePromise = this.page.waitForResponse(matchesResponse(APIConfig.articleBySlug(slug), 'PUT'));
    await this.submitArticleForm();
    const responseBody = await (await responsePromise).json() as ArticleResponse;
    const newSlug: string = responseBody.article.slug;
    this.context.addArticle(responseBody.article);
    return newSlug;
  }

  private async gotoEditor(): Promise<void> {
    await this.articleLocators.newArticleNavLink.click();
  }

  private async gotoEditorForSlug(slug: string): Promise<void> {
    const articleResponsePromise = this.page.waitForResponse(
      matchesResponse(APIConfig.articleBySlug(slug), 'GET'),
    );
    await this.page.goto(UIConfig.editorPage(slug));
    await articleResponsePromise;
  }

  private async fillArticleForm(article: ArticleRequest): Promise<void> {
    await this.articleLocators.titleInput.fill(article.title);
    await this.articleLocators.descriptionInput.fill(article.description);
    await this.articleLocators.bodyTextarea.fill(article.body);
    for (const tag of article.tagList) {
      await this.articleLocators.tagsInput.fill(tag);
      await this.articleLocators.tagsInput.press('Tab');
    }
  }

  private async submitArticleForm(): Promise<void> {
    await this.commonLocators.buttonByName('Publish Article').click();
  }
}
