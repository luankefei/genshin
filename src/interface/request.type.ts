type IRequestParams = {
  method: string;
  headers?: any;
  body?: any;
};

type IRequest = {
  params?: any;
  data?: any;
  form?: any;
};
export type { IRequestParams, IRequest };
