import { inject, injectable, singleton } from "tsyringe";
import type { Ajax, DirectionType, Route } from "@dedong/mapbox-common";
import type MapboxUrl from "@dedong/mapbox-url";

@injectable()
@singleton()
export default class MapboxDirection {
  constructor(
    @inject("Ajax") private ajax: Ajax,
    @inject("MapboxUrl") private url: MapboxUrl,
  ) {}

  public async getDirections({
    spotCoords,
    type,
  }: {
    spotCoords: Array<[number, number]>;
    type: DirectionType;
  }): Promise<Array<[number, number]>> {
    const url = this.url.getDirectionUrl({ spotCoords, type });

    return this.ajax
      .requestGET<{
        routes: Array<Route>
      }>({
        url,
      })
      .then((data) => {
        if (
          !data ||
          !data.routes ||
          !data.routes[0] ||
          !data.routes[0].geometry ||
          !data.routes[0].geometry.coordinates
        ) {
          return [];
        }
        return data.routes[0].geometry.coordinates;
      });
  }
}
