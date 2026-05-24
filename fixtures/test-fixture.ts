import { test as base } from '@playwright/test';
import { ArticleApiStep } from '../steps/articleApi-step';
import { TagsApiStep } from '../steps/tagsApi-step';
import { AuthUiStep } from '../steps/authUi-step';
import { ArticleUiStep } from '../steps/articleUi-step';
import { AuthAPI } from '../api-services/auth-api';
import { user01 } from './users';

export type TestOptions = {
  authApi: AuthAPI;
  articleApiStep: ArticleApiStep;
  tagsApiStep: TagsApiStep;
  authUiStep: AuthUiStep;
  articleUiStep: ArticleUiStep;
};

export const test = base.extend<TestOptions>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthAPI(request);
    await use(authApi);
  },

  authUiStep: async ({ page }, use) => {
    await use(new AuthUiStep(page));
  },

  articleApiStep: async ({ authApi, request }, use) => {
    const token = await authApi.getToken(user01);
    const articleApiStep = new ArticleApiStep(request, token);
    await use(articleApiStep);
    await articleApiStep.cleanUpArticles();
  },

  tagsApiStep: async ({ request }, use) => {
    await use(new TagsApiStep(request));
  },

  articleUiStep: async ({ page, articleApiStep }, use) => {
    await use(new ArticleUiStep(page, articleApiStep));
  },
});
