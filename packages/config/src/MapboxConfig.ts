/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { injectable, singleton } from "tsyringe";
import type { MapboxConfigOption } from "~/types/index.d";

const defaultOption: Partial<MapboxConfigOption> = {
  theme: "light-v10",
}

@injectable()
@singleton()
export default class MapboxConfig {
  private opt: MapboxConfigOption;

  constructor(opt: MapboxConfigOption) {
    this.opt = { ...defaultOption, ...opt };
  }

  public getAccessToken(): string {
    return this.opt.accessToken;
  }

  public getTheme(): string {
    return this.opt.theme;
  }
}
