import { Page } from '@playwright/test';
import { AuthLocators } from '../utils/UiLocators/AuthLocators';
import { CommonLocators } from '../utils/UiLocators/CommonLocators';
import { User } from '../types/user-type';
import { expect } from '@playwright/test';
import { BaseUiStep } from './baseUi-step';

export class AuthUiStep extends BaseUiStep {
  private authLocators: AuthLocators;
  private commonLocators: CommonLocators;

  constructor(page: Page) {
    super(page);
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

  async verifyLoginSuccess(user: User): Promise<void> {
    await expect(this.authLocators.profileNavLink).toContainText(user.username);
    await expect(this.authLocators.signInNavLink).not.toBeVisible();
  }

  async verifyLoginFailed(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.authLocators.errorMessages.first()).toHaveText(
      'Invalid email or password',
    );
  }

  async logout(): Promise<void> {
    await this.authLocators.settingsNavLink.click();
    await this.authLocators.logoutButton.click();
  }

  async verifyLogoutSuccess(): Promise<void> {
    await expect(this.authLocators.signInNavLink).toBeVisible();
    await expect(this.authLocators.profileNavLink).not.toBeVisible();
  }
}
