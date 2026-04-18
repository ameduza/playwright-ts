import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import articleGenerator from '../generators/articles-generator';

test('tags endpoint returns a non-empty list', async ({ tagsApiStep }) => {
  const data = await tagsApiStep.getTags();

  expect(data.tags.length).toBeGreaterThan(0);
});

test('return tag from the just added article', async ({ articleApiStep, tagsApiStep }) => {
    const articleRequest = articleGenerator.generateArticleRequest();
    await articleApiStep.createArticle(articleRequest);
    const tagsResponse = await tagsApiStep.getTags();
    expect(tagsResponse.tags).toContain(articleRequest.tagList[0]);
});
