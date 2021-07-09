import MapboxService from "../src/MapboxService";
import option from "./.helptest.option";
import { directionMock } from "./mock/direction";

const globalRef = global as any;

/**
 * @jest-environment jsdom
 */
describe('mapbox-direction specification', () => {
  let service: MapboxService = null;
  let spotCoords: Array<[number, number]>
  
  beforeEach(() => {
    spotCoords = [
      [127.029835, 37.503202],
      [127.033547, 37.501815],
      [127.034931, 37.503215]
    ];
    service = new MapboxService(option);
  });

  it('getDirectionUrl()', (done) => {
    globalRef.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => directionMock  }));
    service.direction.getDirections({
      spotCoords,
      type: "cycling"
    }).then(ret => {
      expect(ret).toBeInstanceOf(Array);
      expect(ret[0].length).toBe(2);
      expect(typeof ret[0][0]).toBe("number");
      expect(ret.length).toBeGreaterThanOrEqual(spotCoords.length)
      done();
    })
  });
});
