import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { user01 } from '../fixtures/users';

test('login with valid credentials', async ({ authUiStep }) => {
  await authUiStep.login(user01.email, user01.password);

  await authUiStep.verifySuccessfulLogin(user01);
});

test('login with invalid password', async ({ authUiStep, page }) => {
  await authUiStep.login(user01.email, 'wrongPassword123');

  await expect(page).toHaveURL(/login/);
  await authUiStep.verifyErrorMessage('Invalid email or password');
});
