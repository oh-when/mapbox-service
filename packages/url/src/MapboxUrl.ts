import { inject, injectable, singleton } from "tsyringe";
import type MapboxConfig from "@dedong/mapbox-config";
import type { DirectionType } from "@dedong/mapbox-common";

@injectable()
@singleton()
export default class MapboxUrl {
  private static URL_ORIGIN = "https://api.mapbox.com";
  private static STATIC_IMAGE_PATHS = "styles/v1/mapbox";
  private static DIRECTION_PATHS = "directions/v5/mapbox";

  constructor(
    @inject("MapboxConfig")
    private config: MapboxConfig
  ) {}

  public getDirectionUrl({
    spotCoords,
    type,
  }: {
    spotCoords: Array<[number, number]>;
    type: DirectionType;
  }): string {
    const { URL_ORIGIN, DIRECTION_PATHS } = MapboxUrl;
    const route = spotCoords
      .reduce((str, coord) => `${str};${coord[0]},${coord[1]}`, "")
      .substr(1);

    return `${URL_ORIGIN}/${DIRECTION_PATHS}/${type}/${route}?geometries=geojson&access_token=${this.config.getAccessToken()}`;
  }

  public getStaticImageUrl({
    geojson,
    width,
    height,
  }: {
    geojson: Record<string, any>;
    width: number;
    height: number;
  }): string {
    const { URL_ORIGIN, STATIC_IMAGE_PATHS } = MapboxUrl;

    const url = [
      URL_ORIGIN,
      STATIC_IMAGE_PATHS,
      this.config.getTheme(),
      "static",
      `geojson(${encodeURIComponent(JSON.stringify(geojson))})`,
      "auto",
      `${width}x${height}`,
    ].join("/");

    return `${url}?access_token=${this.config.getAccessToken()}`;
  }

  public getGeoJson({
    spots,
    line,
  }: {
    spots: Array<{
      coord: [number, number];
      imageUrl: string;
    }>;
    line: {
      coords: Array<[number, number]>,
      color: string;
      width: number;
    };
  }): Record<string, any> {
    const geojson = {
      type: "FeatureCollection",
      features: [],
    };

    spots.forEach((spot) => {
      geojson.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: spot.coord,
        },
        properties: {
          "marker-size": "medium",
          "marker-symbol": "bus",
          "marker-color": "#ace",
        },
      });
    });

    geojson.features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: line.coords,
      },
      properties: {
        stroke: line.color,
        "stroke-width": line.width,
      },
    });

    return geojson;
  }
}
