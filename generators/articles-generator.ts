import { faker } from '@faker-js/faker';
import { ArticleRequest } from '../types/article-type';

class ArticleGenerator {
  generateArticleRequest(overrides?: Partial<ArticleRequest>): ArticleRequest {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      tagList: [faker.lorem.word()],
      ...overrides,
    };
  }
}

const articleGenerator = new ArticleGenerator();
export default articleGenerator;