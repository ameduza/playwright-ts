import { Page } from '@playwright/test';
import { ArticleLocators } from '../utils/UiLocators/ArticleLocators';
import { CommonLocators } from '../utils/UiLocators/CommonLocators';
import { ArticleRequest } from '../types/article-type';
import { ArticleApiStep } from './articleApi-step';
import { APIConfig } from '../utils/configs/api-config';

export class ArticleUiStep {
  private page: Page;
  private articleLocators: ArticleLocators;
  private commonLocators: CommonLocators;
  private articleApiStep: ArticleApiStep;

  constructor(page: Page, articleApiStep: ArticleApiStep) {
    this.page = page;
    this.articleLocators = new ArticleLocators(page);
    this.commonLocators = new CommonLocators(page);
    this.articleApiStep = articleApiStep;
  }

  async createArticle(article: ArticleRequest): Promise<string> {
    await this.gotoEditor();
    await this.fillArticleForm(article);

    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes(APIConfig.articles) &&
        response.request().method() === 'POST',
    );
    await this.submitArticleForm();
    const response = await responsePromise;

    const body = await response.json();
    const slug: string = body.article.slug;
    this.articleApiStep.trackSlug(slug);
    return slug;
  }

  private async gotoEditor(): Promise<void> {
    await this.articleLocators.newArticleNavLink.click();
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
