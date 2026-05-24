import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import articleGenerator from '../generators/articles-generator';

test('tags endpoint returns a non-empty list', async ({ api }) => {
  const data = await api.tagsApiStep.getTags();

  expect(data.tags.length).toBeGreaterThan(0);
});

test('return tag from the just added article', async ({ api }) => {
  const articleRequest = articleGenerator.getArticleRequest();
  await api.articleApiStep.createArticle(articleRequest);
  const tagsResponse = await api.tagsApiStep.getTags();
  expect(tagsResponse.tags).toContain(articleRequest.tagList[0]);
});
