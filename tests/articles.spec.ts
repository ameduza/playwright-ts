import { expect } from '@playwright/test';
import { TagsResponse } from '../types/tags-type';
import { test } from '../fixtures/test-fixture';
import articleGenerator from '../generators/articles-generator';

test('api first test', async ({ request }) => {
  const response = await request.get(' http://localhost:8000/api/tags');
  const data = (await response.json()) as TagsResponse;

  expect(response.status()).toBe(200);
  expect(data.tags).toContain('tag1');
});

test('create article', async ({ articleApi }) => {
  const articleRequest = articleGenerator.generateArticleRequest();

  const actualArticle = (await articleApi.createArticle(articleRequest))
    .article;

  expect(actualArticle).toMatchObject({
    ...articleRequest,
    tagList: expect.arrayContaining(articleRequest.tagList),
  });
});
