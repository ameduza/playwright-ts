import { Page } from '@playwright/test';
import { AuthLocators } from '../utils/UiLocators/AuthLocators';
import { CommonLocators } from '../utils/UiLocators/CommonLocators';
import { User } from '../types/user-type';
import { expect } from '@playwright/test';

export class AuthUiStep {
  private page: Page;
  private authLocators: AuthLocators;
  private commonLocators: CommonLocators;

  constructor(page: Page) {
    this.page = page;
    this.authLocators = new AuthLocators(page);
    this.commonLocators = new CommonLocators(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.goto('');
    await this.authLocators.signInNavLink.click();
    await this.authLocators.emailInput.fill(email);
    await this.authLocators.passwordInput.fill(password);
    await this.commonLocators.buttonByName('Sign in').click();
  }

  async verifySuccessfulLogin(user: User): Promise<void> {
    await expect(this.authLocators.profileNavLink).toContainText(user.username);
    await expect(this.authLocators.signInNavLink).not.toBeVisible();
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.authLocators.errorMessages.first()).toHaveText(
      expectedMessage,
    );
  }

}
