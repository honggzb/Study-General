[瓦片贴图尝试-interactive tile Maps](#top)

----------------------------------------

```ts
import L from 'leaflet';
const BASE_URL = 'https://act-webstatic.mihoyo.com/ys-map-op/map/';
const mapContainer = document.getElementById('map');
//
const mapConfig = {
  map_id = 2,
  map_version = "",
  min_zoom: -3,  // 最小缩放级别
  max_zoom: 0,   //
  total_size: [36864, 18432] as [number, number],
  origin: [23789, 6382] as [number, number]
};
const = L.map(mapContainer, {
  crs: L.CRS.Simple,  // 使用最简单坐标系用于平面图像、游戏地图、室内地图等非地理地图
  min_zoom: -3, // 最小缩放级别
  max_zoom: 4.5,
  center: [0, 0],
  zoom: -3     // 初始缩放级别
});
// 检查浏览器是否支持WebP
function supportsWebP(): boolean {
  const elem = document.createElement('canvas');
  if(elem.getContext && elem.getContext('2d')) {
    return elem.toDataUrl('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}
// 创建自定义瓦片图层
const CustomTileLayer = L.GridLayer.extend({
  createTile: function(coords: L.Coords, done: L.DonCallback) {
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    //
    img.dataset.x = coords.x.toString;
    img.dataset.y = coords.y.toString;
    img.dataset.z = coords.z.toString;
    const zoomStr = (coords.z < 0 ? "N" : "P") + Math.abs(coords.z); //
    const format = supportsWebP() ? "webp" : "png";
    const tileUrl = `{BASE_URL}${mapConfig.map_id}/${mapConfig.map_version}/${coords.x}_${coords.y}_${zoomStr}.${format}`;
    img.src = tileUrl;

    img.onload = function() {
      done(undefined, img);
    }
    return img;
  }
});
// 计算地图边界，现在地图的可视范围
const [width, height] = mapConfig.total_size;
cont bounds = L.lanlngBounds(
  map.unproject([0,0], 0),
  map.unproject([width, height], 0)
);
// 创建并添加瓦片图层
//@ts-ignore
const tileLayer = new CustomTileLayer({
  bounds: bounds,
  minNativeZoom: mapConfig.min_zoom,
  maxNativeZoom: mapConfig.max_zoom,
  minZoom: 4.5,
  tileSize: 256,
  noWrap: true,
  className: 'map-tile'
});
```

- ![tile Maps](./images/tile-maps.png)
- https://act.mihoyo.com/ys/app/interactive-map/index.html?lang=zh-cn#/map/2?shown_types=&center=1846.00,-3505.00&zoom=-3.00

[⬆ back to top](#top)

- [leafletjs](https://leafletjs.com/)
- [canvaskit-js](https://skia.org/docs/user/modules/quickstart/)
