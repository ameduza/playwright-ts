import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import articleGenerator from '../generators/articles-generator';

test('create article', async ({ articleApiStep: articleApi }) => {
  const articleRequest = articleGenerator.generateArticleRequest();

  const actualArticle = (await articleApi.createArticle(articleRequest))
    .article;

  expect(actualArticle).toMatchObject({
    ...articleRequest,
    tagList: expect.arrayContaining(articleRequest.tagList),
  });
});
