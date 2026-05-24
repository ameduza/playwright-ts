import { Locator, Page } from '@playwright/test';

export class ArticleLocators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get titleInput(): Locator {
    return this.page.getByPlaceholder('Article Title');
  }

  get descriptionInput(): Locator {
    return this.page.getByPlaceholder("What's this article about?");
  }

  get bodyTextarea(): Locator {
    return this.page.getByPlaceholder('Write your article (in markdown)');
  }

  get tagsInput(): Locator {
    return this.page.getByPlaceholder('Enter tags');
  }

  get newArticleNavLink(): Locator {
    return this.page.locator('nav a[href="#/editor"]');
  }

  get editArticleButton(): Locator {
    return this.page.getByRole('link', { name: 'Edit Article' }).first();
  }
}
