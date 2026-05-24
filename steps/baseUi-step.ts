import { Page } from '@playwright/test';

export class BaseUiStep {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
