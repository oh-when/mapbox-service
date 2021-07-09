# MapboxService

simple mapbox service api

## Getting Started

```sh
npm i -d @dedong/mapbox-service
```

```js
import MapboxService from "@dedong/mapbox-service";

const mapboxService = new MapboxService({
  accessToken: "...token"
});
```

- [direction example](./docs/examples/direction.md)
- [static image example](./docs/examples/static-image.md)

## Test

```sh
# install dependencies
npm install
npm run bootstrap
# run test
npm run test
```

## Build

```sh
# if you need
npm install
npm run bootstrap
# build
npm run build
```