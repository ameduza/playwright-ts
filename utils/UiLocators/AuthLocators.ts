import { Locator, Page } from '@playwright/test';

export class AuthLocators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get emailInput(): Locator {
    return this.page.getByPlaceholder('Email');
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder('Password');
  }

  get errorMessages(): Locator {
    return this.page.locator('ul.error-messages li');
  }

  get profileNavLink(): Locator {
    return this.page.locator('a[href="#/my-profile"]');
  }

  get signInNavLink(): Locator {
    return this.page.locator('nav a[href="#/login"]');
  }
}
