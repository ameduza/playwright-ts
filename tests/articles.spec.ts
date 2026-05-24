import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import articleGenerator from '../generators/articles-generator';

test('create article', async ({ api }) => {
  const expectedArticle = articleGenerator.getArticleNoTagsRequest();

  const actualArticle = (
    await api.articleApiStep.createArticle(expectedArticle)
  ).article;

  expect(actualArticle).toMatchObject(expectedArticle);
});

test('create article with no Title', async ({ api }) => {
  const expectedArticle = articleGenerator.getArticleNoTagsRequest();
  expectedArticle.title = '';

  const createArticleResponse =
    await api.articleApiStep.createArticleNoStatusCheck(expectedArticle);

  expect(createArticleResponse.status()).toBe(422);
});
