import { test as base } from '@playwright/test';
import { ArticleApiStep } from '../steps/articleApi-step';
import { TagsApiStep } from '../steps/tagsApi-step';
import { AuthUiStep } from '../steps/authUi-step';
import { ArticleUiStep } from '../steps/articleUi-step';
import { AuthAPI } from '../api-services/auth-api';
import { user01 } from './users';

type TestFixtures = {
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
  api: async ({ request }, use) => {
    const authApi = new AuthAPI(request);
    const token = await authApi.getToken(user01);
    const articleApiStep = new ArticleApiStep(request, token);
    await use({
      authApi,
      articleApiStep,
      tagsApiStep: new TagsApiStep(request),
    });
    await articleApiStep.cleanUpArticles();
  },
  ui: async ({ page, api }, use) => {
    await use({
      authUiStep: new AuthUiStep(page),
      articleUiStep: new ArticleUiStep(page, api.articleApiStep),
    });
  },
});
