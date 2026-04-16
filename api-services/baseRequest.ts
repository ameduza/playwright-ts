import { APIRequestContext } from '@playwright/test';
import { RequestGetParams, RequestPostParams } from '../types/request';

export class BaseRequest {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(params: RequestGetParams) {
	return await this.makeRequest('GET', params);
  }

  async post(params: RequestPostParams) {
	return await this.makeRequest('POST', params);
  }

  private async makeRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    params: RequestGetParams | RequestPostParams,
  ) {
    return await this.request.fetch(params.url, {
      method: method,
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${params.token}`,
        ...params.headers,
      },
      data: 'body' in params ? JSON.stringify(params.body) : undefined,
	  failOnStatusCode: params.failOnStatusCode ?? true,
    });
  }
}
