import { Locator, Page } from '@playwright/test';

export class CommonLocators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  buttonByName(name: string): Locator {
    return this.page.locator(`button:has-text("${name}")`);
  }
}
