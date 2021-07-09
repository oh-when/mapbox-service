import { inject, injectable, singleton } from "tsyringe";
import type { Ajax } from "@dedong/mapbox-common";
import type MapboxUrl from "@dedong/mapbox-url";
import type MapboxDirection from "@dedong/mapbox-direction";

@injectable()
@singleton()
export default class MapboxStaticImage {
  constructor(
    @inject("Ajax") private ajax: Ajax,
    @inject("MapboxUrl") private url: MapboxUrl,
    @inject("MapboxDirection") private direction: MapboxDirection,
  ) {}

  public async getStaticImageSource({
    spotCoords,
    spotImageUrls,
    width,
    height,
    line
  }: {
    spotCoords: Array<[number, number]>;
    spotImageUrls: string[];
    width: number;
    height: number;
    line: { color: string; width: number; };
  }): Promise<string> {
    const lineCoords = await this.direction.getDirections({ type: "cycling", spotCoords });
    const geojson = this.url.getGeoJson({
      spots: spotCoords.map((coord, i) => ({
        coord,
        imageUrl: spotImageUrls[i],
      })),
      line: { coords: lineCoords, ...line },
    });
    const staticImageUrl = this.url.getStaticImageUrl({
      geojson,
      width,
      height,
    });
    const blob = await this.ajax.requestBLOB({
      url: staticImageUrl,
    });
    const base64: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        resolve(e.target.result.toString());
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    return base64;
  }
}
