import "reflect-metadata";
import { container, singleton } from "tsyringe";
import MapboxConfig, { MapboxConfigOption } from "@dedong/mapbox-config";
import MapboxUrl from "@dedong/mapbox-url";

@singleton()
export default class MapboxService {
  constructor(configOption: MapboxConfigOption) {
    container
      .register<MapboxConfig>("MapboxConfig", {
        useValue: new MapboxConfig(configOption)
      }).register("MapboxUrl", {
        useClass: MapboxUrl
      });
  }

  get config(): MapboxConfig {
    return container.resolve<MapboxConfig>("MapboxConfig");
  }

  get url(): MapboxUrl {
    return container.resolve<MapboxUrl>("MapboxUrl");
  }
}
