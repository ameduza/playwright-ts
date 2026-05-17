import { faker } from '@faker-js/faker';
import { ArticleRequest } from '../types/article-type';

class ArticleGenerator {
  getArticleRequest(
    overrides?: Partial<ArticleRequest>,
  ): Required<ArticleRequest> {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      tagList: [faker.lorem.word(), faker.lorem.word()],
      ...overrides,
    };
  }

  getArticleNoTagsRequest(overrides?: Partial<ArticleRequest>): ArticleRequest {
    const articleRequest = this.getArticleRequest(overrides);
    articleRequest.tagList = [];

    return articleRequest;
  }
}

const articleGenerator = new ArticleGenerator();
export default articleGenerator;
