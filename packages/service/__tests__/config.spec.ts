import "reflect-metadata";
import { MapboxConfigOption } from "@dedong/mapbox-config";
import MapboxService from "../src/MapboxService";

describe('mapbox-config specification', () => {
  let option: MapboxConfigOption = null;
  let service: MapboxService = null;

  beforeEach(() => {
    option = {
      accessToken: 'my-token',
      theme: 'light-v10'
    }
    service = new MapboxService(option);
  });

  it('getAccessToken()', () => {
    const ret = service.config.getAccessToken();
    expect(ret).toEqual(option.accessToken);
  });

  it('getTheme()', () => {
    const ret = service.config.getTheme();
    expect(ret).toEqual(option.theme);
  });
});