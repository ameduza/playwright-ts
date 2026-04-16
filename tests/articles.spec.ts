import { expect } from '@playwright/test';
import { TagsResponse } from '../types/tags-type';
import { test } from '../fixtures/test-fixture';
import { faker } from '@faker-js/faker';
import { ArticleRequest } from '../types/article-type';

test('api first test', async ({ request }) => {
  const response = await request.get(' http://localhost:8000/api/tags');
  const data = (await response.json()) as TagsResponse;

  expect(response.status()).toBe(200);
  expect(data.tags).toContain('tag1');
});

test('create article', async ({ articleApi }) => {
  const articleRequest: ArticleRequest = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tagList: [faker.lorem.word()],
  };

  const actualArticle = (await articleApi.createArticle(articleRequest)).article;

  expect(actualArticle.title).toBe(articleRequest.title);
  expect(actualArticle.description).toBe(articleRequest.description);
  expect(actualArticle.body).toBe(articleRequest.body);
  expect(actualArticle.tagList).toEqual(
    expect.arrayContaining(articleRequest.tagList),
  );


});
