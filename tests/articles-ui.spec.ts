import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { user01 } from '../fixtures/users';
import articleGenerator from '../generators/articles-generator';

test('create article via UI', async ({ ui, api }) => {
  await ui.authUiStep.login(user01.email, user01.password);
  const expectedArticle = articleGenerator.getArticleNoTagsRequest();

  const slug = await ui.articleUiStep.createArticle(expectedArticle);

  const actualArticle = await api.articleApiStep.getArticleBySlug(slug);
  expect(actualArticle).toMatchObject(expectedArticle);
});

test('update article via UI', async ({ ui, api }) => {
  await ui.authUiStep.login(user01.email, user01.password);

  const { article: created } = await api.articleApiStep.createArticle(
    articleGenerator.getArticleNoTagsRequest(),
  );

  const updatedArticle = articleGenerator.getArticleNoTagsRequest();
  const newSlug = await ui.articleUiStep.updateArticle(
    created.slug,
    updatedArticle,
  );

  const actualArticle = await api.articleApiStep.getArticleBySlug(newSlug);
  expect(actualArticle).toMatchObject(updatedArticle);
});
