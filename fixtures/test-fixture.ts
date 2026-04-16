import {test as base} from '@playwright/test';
import { BaseRequest } from '../api-services/baseRequest';
import { ArticleAPI } from '../api-services/article-api';

export type TestOptions = {
    articleApi: ArticleAPI

}

export const test = base.extend<TestOptions>({
    articleApi: async ({ request }, use) => {
        const articleApi = new ArticleAPI(request);
        await use(articleApi);
    }
})