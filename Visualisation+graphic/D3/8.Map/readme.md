- [地图的数据](#地图的数据)
- [用d3生成地图](#用d3生成地图)
- [trip project](#trip-project)



https://github.com/jdamiani27/Data-Visualization-and-D3

## 地图的数据

- GeoJSON： 地理信息的通用格式
  - [在线生成GeoJSON](http://geojson.io)
- TopoJSON: d3制订的格式
- 地理信息下载地址： http://www.naturalearthdata.com/downloads/
  - Cultural: 包含文化性的信息，如飞机场、港口等
  - Physical: 包含物理性的信息，如海岸线、陆地、海洋、河流等
  - Raster:   包含栅格地图
  - 转换数据 - [ofr2ofr](http://www.ogr2gui.ca/) tool: shp -> json
  - 简化数据 - http://mapshaper.org/
- 地理信息下载地址： https://www.census.gov/geo/maps-data/data/cbf/cbf_counties.html
  - 转换数据 - [Homebrew](brew.sh), 参考： www.gdal.org
  
```shell
brew install gdal
cd data
ogr2ogr -f GeoJSON -where "STATEFP NOT IN('60','64', '66','68','69','70','72','78')" countries.json cb_2015_us_county_5m.shp
```
## 用d3生成地图

```javascript
var projection = d3.geoMercator()
                   .scale(130)
                   .translate( [width / 2, height / 1.5]);
var path = d3.geoPath().projection(projection);
svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features).enter()
    .append("path");
```

## trip project

- 不同颜色标记访问过的国家和未访问过的国家
- 点击访问过的国家，zoom to访问过的国家
- 使用`https://unpkg.com/world-atlas@1/world/110m.json`数据，其格式和world_countires.json略有不同
