import "reflect-metadata";
import { container, singleton } from "tsyringe";
import { Ajax } from "@dedong/mapbox-common";
import MapboxConfig, { MapboxConfigOption } from "@dedong/mapbox-config";
import MapboxUrl from "@dedong/mapbox-url";
import MapboxDirection from "@dedong/mapbox-direction";
import MapboxStaticImage from "@dedong/mapbox-static-image";

@singleton()
export default class MapboxService {
  constructor(configOption: MapboxConfigOption) {
    container
      .register<Ajax>("Ajax", {
        useClass: Ajax,
      })
      .register<MapboxConfig>("MapboxConfig", {
        useValue: new MapboxConfig(configOption)
      })
      .register<MapboxUrl>("MapboxUrl", {
        useClass: MapboxUrl
      })
      .register<MapboxDirection>("MapboxDirection", {
        useClass: MapboxDirection
      })
      .register<MapboxStaticImage>("MapboxStaticImage", {
        useClass: MapboxStaticImage
      });
  }

  get config(): MapboxConfig {
    return container.resolve<MapboxConfig>("MapboxConfig");
  }

  get url(): MapboxUrl {
    return container.resolve<MapboxUrl>("MapboxUrl");
  }

  get direction(): MapboxDirection {
    return container.resolve<MapboxDirection>("MapboxDirection");
  }

  get staticImage(): MapboxStaticImage {
    return container.resolve<MapboxStaticImage>("MapboxStaticImage");
  }
}
