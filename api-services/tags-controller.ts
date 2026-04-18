import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIConfig } from '../utils/configs/api-config';
import { BaseRequest } from './baseRequest';

export class TagsController {
  private request: BaseRequest;

  constructor(request: APIRequestContext) {
    this.request = new BaseRequest(request);
  }

  async getTags(): Promise<APIResponse> {
    return await this.request.get({
      url: APIConfig.tags,
    });
  }
}
