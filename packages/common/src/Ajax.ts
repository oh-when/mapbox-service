import { injectable, singleton } from "tsyringe";

export type AjaxRequestInput<
  URLParam extends Record<string, any> = Record<string, any>,
  BodyData extends Record<string, any> = Record<string, any>
> = {
  url: string;
  paths?: string[];
  param?: URLParam;
  data?: BodyData;
};

@injectable()
@singleton()
export class Ajax {
  public async requestGET<
    R extends Record<string, any> = any,
    D extends Record<string, any> = any
  >(input: AjaxRequestInput<D>): Promise<R> {
    const urlObject = this.getUrlObject(input);

    return window
      .fetch(urlObject.toString(), { method: "GET" })
      .then((response) => response.json() as unknown as R);
  }

  public async requestBLOB<D extends Record<string, any> = any>(
    input: AjaxRequestInput<D>
  ): Promise<Blob> {
    const urlObject = this.getUrlObject(input);

    return window
      .fetch(urlObject.toString(), { method: "GET" })
      .then((response) => response.blob());
  }

  public getUrl(input: AjaxRequestInput): URL {
    return this.getUrlObject(input);
  }

  protected getUrlObject({ url, paths, param }: AjaxRequestInput): URL {
    const urlObject = new URL(url);

    if (paths) {
      urlObject.pathname = `/${urlObject.pathname
        .split("/")
        .filter((segment) => segment !== "")
        .concat(paths)
        .join("/")}`;
    }

    if (param) {
      const paramObject = new URLSearchParams(urlObject.search);
      for (const key in param) {
        paramObject.set(key, param[key]);
      }
      urlObject.search = `?${paramObject.toString()}`;
    }

    return urlObject;
  }
}
