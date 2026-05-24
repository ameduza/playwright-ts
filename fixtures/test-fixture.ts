import { test as base } from '@playwright/test';
import { ArticleApiStep } from '../steps/articleApi-step';
import { TagsApiStep } from '../steps/tagsApi-step';
import { AuthUiStep } from '../steps/authUi-step';
import { ArticleUiStep } from '../steps/articleUi-step';
import { AuthAPI } from '../api-services/auth-api';
import { TestContext } from './test-context';
import { user01 } from './users';

type TestFixtures = {
  testContext: TestContext;
  api: {
    authApi: AuthAPI;
    articleApiStep: ArticleApiStep;
    tagsApiStep: TagsApiStep;
  };
  ui: {
    authUiStep: AuthUiStep;
    articleUiStep: ArticleUiStep;
  };
};

export const test = base.extend<TestFixtures>({
  // eslint-disable-next-line no-empty-pattern
  testContext: async ({}, use) => {
    await use(new TestContext());
  },
  api: async ({ request, testContext }, use) => {
    const authApi = new AuthAPI(request);
    const token = await authApi.getToken(user01);
    const articleApiStep = new ArticleApiStep(request, token, testContext);
    await use({
      authApi,
      articleApiStep,
      tagsApiStep: new TagsApiStep(request),
    });
    await articleApiStep.cleanUpArticles();
  },
  ui: async ({ page, testContext }, use) => {
    await use({
      authUiStep: new AuthUiStep(page),
      articleUiStep: new ArticleUiStep(page, testContext),
    });
  },
});
