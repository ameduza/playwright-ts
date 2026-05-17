interface RequestBase {
  url: string;
  token?: string;
  headers?: Record<string, string>;
  failOnStatusCode?: boolean;
}

export type RequestPostParams = RequestBase & {
  body: unknown;
};

export type RequestPutParams = RequestBase & {
  body?: unknown;
};

export type RequestDeleteParams = RequestBase & {};

export type RequestGetParams = RequestBase & {};
