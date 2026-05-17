import { Locator, Page } from '@playwright/test';
import { UIConfig } from '../utils/configs/ui-config';

export class AuthUiStep {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(`${UIConfig.baseURL}${UIConfig.loginPage}`);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.locator(UIConfig.emailInput).fill(email);
    await this.page.locator(UIConfig.passwordInput).fill(password);
    await this.page.locator(UIConfig.signInButton).click();
  }

  getErrorMessages(): Locator {
    return this.page.locator(UIConfig.errorMessages);
  }

  getProfileNavLink(): Locator {
    return this.page.locator(UIConfig.profileNavLink);
  }

  getSignInNavLink(): Locator {
    return this.page.locator(UIConfig.signInNavLink);
  }
}
