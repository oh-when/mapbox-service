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

## Dev

```sh
# install dependencies
npm install
npm run bootstrap
# run dev server
npx lerna run dev --scope=@dedong/mapbox-service
```

## Build

```sh
# if you need
npm install
npm run bootstrap
# build
npx lerna run build --scope=@dedong/mapbox-service
```