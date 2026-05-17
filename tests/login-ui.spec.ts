import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { user01 } from '../fixtures/users';

test('login with valid credentials', async ({ authUiStep }) => {
  await authUiStep.goto();
  await authUiStep.login(user01.email, user01.password);

  await expect(authUiStep.getProfileNavLink()).toContainText(user01.username);
  await expect(authUiStep.getSignInNavLink()).not.toBeVisible();
});

test('login with invalid password', async ({ authUiStep, page }) => {
  await authUiStep.goto();
  await authUiStep.login(user01.email, 'wrongPassword123');

  await expect(page).toHaveURL(/login/);
  await expect(authUiStep.getErrorMessages()).toBeVisible();
});
