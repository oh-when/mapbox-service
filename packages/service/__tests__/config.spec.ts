import MapboxService from "../src/MapboxService";
import option from "./.helptest.option";

describe('mapbox-config specification', () => {
  let service: MapboxService = null;
  beforeEach(() => {
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