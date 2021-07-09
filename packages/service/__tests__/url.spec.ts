import MapboxService from "../src/MapboxService";
import option from "./.helptest.option";

describe('mapbox-url specification', () => {
  let service: MapboxService = null;
  let spots: Array<{ coord: [number, number]; imageUrl: string; }>
  let line: { coords: Array<[number, number]>; color: string; width: number; }
  let geojson: Record<string, any>;
  
  beforeEach(() => {
    spots = [
      { coord: [127.029835, 37.503202], imageUrl: "" },
      { coord: [127.033547, 37.501815], imageUrl: "" },
      { coord: [127.034931, 37.503215], imageUrl: "" },
    ];
    line = {
      coords: [
        [127.029819, 37.503211], [127.029877, 37.503278], [127.030459, 37.502962],
        [127.031738, 37.50311], [127.032361, 37.501856], [127.032937, 37.502042],
        [127.033017, 37.501861], [127.03343, 37.501972], [127.033591, 37.501855],
        [127.033543, 37.501818], [127.03369, 37.501923], [127.033646, 37.502857],
        [127.03491, 37.503245]
      ],
      color: "#000000",
      width: 3,
    };
    geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: spots[0].coord },
          properties: {"marker-size": "medium","marker-symbol": "bus","marker-color": "#ace"},
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: spots[1].coord },
          properties: {"marker-size": "medium","marker-symbol": "bus","marker-color": "#ace"},
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: spots[2].coord },
          properties: {"marker-size": "medium","marker-symbol": "bus","marker-color": "#ace"},
        },
        {
          type: "Feature",
          geometry: { type: "LineString", coordinates: line.coords },
          properties: { stroke: line.color, "stroke-width": line.width },
        }
      ],
    }
    service = new MapboxService(option);
  });

  it('getDirectionUrl()', () => {
    const spotCoords: Array<[number, number]> = [
      [127.029835, 37.503202],
      [127.033547, 37.501815],
      [127.034931, 37.503215]
    ];
    const ret = service.url.getDirectionUrl({
      spotCoords,
      type: 'cycling'
    })

    expect(ret).toEqual(`https://api.mapbox.com/directions/v5/mapbox/cycling/127.029835,37.503202;127.033547,37.501815;127.034931,37.503215?geometries=geojson&access_token=${option.accessToken}`);
  });

  it('getStaticImageUrl()', () => {
    const ret = service.url.getStaticImageUrl({
      geojson,
      width: 480,
      height: 480,
    });

    expect(ret).toEqual(`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B127.029835%2C37.503202%5D%7D%2C%22properties%22%3A%7B%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%2C%22marker-color%22%3A%22%23ace%22%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B127.033547%2C37.501815%5D%7D%2C%22properties%22%3A%7B%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%2C%22marker-color%22%3A%22%23ace%22%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B127.034931%2C37.503215%5D%7D%2C%22properties%22%3A%7B%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%2C%22marker-color%22%3A%22%23ace%22%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B127.029819%2C37.503211%5D%2C%5B127.029877%2C37.503278%5D%2C%5B127.030459%2C37.502962%5D%2C%5B127.031738%2C37.50311%5D%2C%5B127.032361%2C37.501856%5D%2C%5B127.032937%2C37.502042%5D%2C%5B127.033017%2C37.501861%5D%2C%5B127.03343%2C37.501972%5D%2C%5B127.033591%2C37.501855%5D%2C%5B127.033543%2C37.501818%5D%2C%5B127.03369%2C37.501923%5D%2C%5B127.033646%2C37.502857%5D%2C%5B127.03491%2C37.503245%5D%5D%7D%2C%22properties%22%3A%7B%22stroke%22%3A%22%23000000%22%2C%22stroke-width%22%3A3%7D%7D%5D%7D)/auto/480x480?access_token=${option.accessToken}`);
  });

  it('getGeoJson()', () => {
    const ret = service.url.getGeoJson({
      spots,
      line
    });

    expect(ret).toEqual(geojson);
  });
});
