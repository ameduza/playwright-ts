import { test } from '../fixtures/test-fixture';
import { user01 } from '../fixtures/users';

test('login with valid credentials', async ({ ui }) => {
  await ui.authUiStep.login(user01.email, user01.password);

  await ui.authUiStep.verifyLoginSuccess(user01);
});

test('login with invalid password', async ({ ui }) => {
  await ui.authUiStep.login(user01.email, 'wrongPassword123');

  await ui.authUiStep.verifyLoginFailed();
});

test('logout after successful login', async ({ ui }) => {
  await ui.authUiStep.login(user01.email, user01.password);
  await ui.authUiStep.verifyLoginSuccess(user01);

  await ui.authUiStep.logout();

  await ui.authUiStep.verifyLogoutSuccess();
});
