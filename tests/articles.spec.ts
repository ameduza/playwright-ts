import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import articleGenerator from '../generators/articles-generator';

test('create article', async ({ articleApiStep: articleApi }) => {
  const expectedArticle = articleGenerator.getArticleNoTagsRequest();

  const actualArticle = (await articleApi.createArticle(expectedArticle))
    .article;

  expect(actualArticle).toMatchObject(expectedArticle);
});

test('create article with no Title', async ({ articleApiStep: articleApi }) => {
  const expectedArticle = articleGenerator.getArticleNoTagsRequest();
  expectedArticle.title = '';

  const createArticleResponse =
    await articleApi.createArticleNoStatusCheck(expectedArticle);

  expect(createArticleResponse.status()).toBe(422);
});
