import { test as base } from '@playwright/test';
import { ArticleApiStep } from '../steps/articleApi-step';
import { TagsApiStep } from '../steps/tagsApi-step';
import { AuthAPI } from '../api-services/auth-api';
import { user01 } from './users';

export type TestOptions = {
  authApi: AuthAPI;
  articleApiStep: ArticleApiStep;
  tagsApiStep: TagsApiStep;
};

export const test = base.extend<TestOptions>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthAPI(request);
    await use(authApi);
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
});
