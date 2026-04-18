import { APIRequestContext, expect } from '@playwright/test';
import { TagsResponse } from '../types/tags-type';
import { TagsController } from '../api-services/tags-controller';

export class TagsApiStep {
  private controller: TagsController;

  constructor(request: APIRequestContext) {
    this.controller = new TagsController(request);
  }

  async getTags(): Promise<TagsResponse> {
    const response = await this.controller.getTags();
    expect(response.status()).toBe(200);
    return (await response.json()) as TagsResponse;
  }
}
