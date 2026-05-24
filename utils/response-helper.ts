import { Response } from '@playwright/test';

export function matchesResponse(urlSubstring: string, method: string) {
  return (response: Response) =>
    response.url().includes(urlSubstring) &&
    response.request().method() === method;
}
