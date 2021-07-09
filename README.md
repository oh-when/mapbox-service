# MapBoxService

mapbox service api

## Getting Started

```sh
npm i -d @dedong/mapbox-service
```

```ts
import MapBoxService from "@dedong/mapbox-service";

const mapboxService = new MapBoxService({
  accessToken: "...token"
});
```

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
npx lerna run build --scope=@dedong/mapbox-service
```