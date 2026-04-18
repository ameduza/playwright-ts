import { APIRequestContext } from '@playwright/test';
import { APIConfig } from '../utils/configs/api-config';
import { BaseRequest } from './baseRequest';
import { User } from '../types/user-type';

export class AuthAPI {
  private request: BaseRequest;
  private static tokenCache: Map<string, string> = new Map();

  constructor(request: APIRequestContext) {
    this.request = new BaseRequest(request);
  }

  async getToken(user: User): Promise<string> {
    const cached = AuthAPI.tokenCache.get(user.email);
    if (cached) {
      return cached;
    }

    const response = await this.request.post({
      url: APIConfig.login,
      body: { user: { email: user.email, password: user.password } },
    });

    const data = await response.json();
    const token = data.user.token;
    AuthAPI.tokenCache.set(user.email, token);
    return token;
  }
}
