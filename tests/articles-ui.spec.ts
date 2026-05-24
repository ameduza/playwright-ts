import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { user01 } from '../fixtures/users';
import articleGenerator from '../generators/articles-generator';

test('create article via UI', async ({
  authUiStep,
  articleUiStep,
  articleApiStep,
}) => {
  await authUiStep.login(user01.email, user01.password);
  const expectedArticle = articleGenerator.getArticleNoTagsRequest();

  const slug = await articleUiStep.createArticle(expectedArticle);

  const actualArticle = await articleApiStep.getArticleBySlug(slug);
  expect(actualArticle).toMatchObject(expectedArticle);
});

test('update article via UI', async ({
  authUiStep,
  articleUiStep,
  articleApiStep,
}) => {
  await authUiStep.login(user01.email, user01.password);

  const { article: created } =
    await articleApiStep.createArticle(articleGenerator.getArticleNoTagsRequest());

  const updatedArticle = articleGenerator.getArticleNoTagsRequest();
  const newSlug = await articleUiStep.updateArticle(
    created.slug,
    updatedArticle,
  );

  const actualArticle = await articleApiStep.getArticleBySlug(newSlug);
  expect(actualArticle).toMatchObject(updatedArticle);
});
