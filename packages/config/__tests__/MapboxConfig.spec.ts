import "reflect-metadata";
import MapboxConfig from "~/MapboxConfig";
import type { MapboxConfigOption } from '~/types/index.d';

describe('MapboxConfig specification', () => {
  let option: MapboxConfigOption = null;
  let config: MapboxConfig = null;

  beforeEach(() => {
    option = {
      accessToken: 'my-token',
      theme: 'light-v10'
    }
    config = new MapboxConfig(option);
  });

  it('getAccessToken()', () => {
    const ret = config.getAccessToken();
    expect(ret).toEqual(option.accessToken);
  });

  it('getTheme()', () => {
    const ret = config.getTheme();
    expect(ret).toEqual(option.theme);
  });
});