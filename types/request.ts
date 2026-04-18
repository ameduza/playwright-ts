interface RequestBase {
  url: string;
  token?: string;
  headers?: Record<string, any>;
  failOnStatusCode?: boolean;
}

export type RequestPostParams = RequestBase & {
  body: any;
};

export type RequestPutParams = RequestBase & {
  body?: any;
};

export type RequestDeleteParams = RequestBase & {};

export type RequestGetParams = RequestBase & {};
