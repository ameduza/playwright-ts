import { expect } from '@playwright/test';
import { TagsResponse } from '../types/tags-type';
import { test } from '../fixtures/test-fixture';
import { APIConfig } from '../utils/configs/api-config';
import articleGenerator from '../generators/articles-generator';

test('api first test', async ({ request }) => {
  const response = await request.get(APIConfig.tags);
  const data = (await response.json()) as TagsResponse;

  expect(response.status()).toBe(200);
  expect(data.tags).toContain('tag1');
});

test('create article', async ({ articleApiStep: articleApi }) => {
  const articleRequest = articleGenerator.generateArticleRequest();

  const actualArticle = (await articleApi.createArticle(articleRequest))
    .article;

  expect(actualArticle).toMatchObject({
    ...articleRequest,
    tagList: expect.arrayContaining(articleRequest.tagList),
  });
});


