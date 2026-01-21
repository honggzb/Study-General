- ⬆ back to top
- ↩ back
- 🤖 Introduction
- ⚙️ Tech Stack
- 🔋 Features
- 🤸 Quick Start
- 🕸️ Snippets
- 🔗 Links
- 🚀 More
- 🚨 Tutorial
- 👉 goto
- 📦 📂 📄 
- ✅

## Highlight && Strikethrough

| Syntax      | sample | code |
|---|----|---|
|highlight|highlight <mark>very important words</mark>|`<mark>very important words</mark>`|
|Strikethrough|~~The world is flat.~~ We now know that the world is round|`~~The world is flat.~~ We now know that the world is round`|
|粗体+颜色|<strong style="color:#DD5145">粗体+颜色</strong>|`<strong style="color:#DD5145">粗体</strong>`|
|斜体+颜色|<i style="color:gray;font-weight:bold">斜体+颜色</i>|`<i style="color:gray;font-weight:bold">颜色</i>`|
|collapsed(折叠)||`<details> </details>`|


<details>

<summary>U am collapsed sections</summary>

## You can add a header
You can add text within a collapsed section.
You can add an image or a code block, too.

puts "Hello World"

</details>

```
<details>

<summary>U am collapsed sections</summary>

## You can add a header
You can add text within a collapsed section.
You can add an image or a code block, too.
puts "Hello World"

</details>
```

## Table

```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph And more   | Text        | And more  And more    |

<table>
    <thead>
        <tr>
            <th>Layer 1</th>
            <th>Layer 2</th>
            <th>Layer 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=4>L1 Name</td>
            <td rowspan=2>L2 Name A</td>
            <td>L3 Name A</td>
        </tr>
        <tr>
            <td>L3 Name B</td>
        </tr>
        <tr>
            <td rowspan=2>L2 Name B</td>
            <td>L3 Name C</td>
        </tr>
        <tr>
            <td>L3 Name D</td>
        </tr>
    </tbody>
</table>

```
<table>
    <thead>
        <tr>
            <th>Layer 1</th>
            <th>Layer 2</th>
            <th>Layer 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=4>L1 Name</td>
            <td rowspan=2>L2 Name A</td>
            <td>L3 Name A</td>
        </tr>
        <tr>
            <td>L3 Name B</td>
        </tr>
        <tr>
            <td rowspan=2>L2 Name B</td>
            <td>L3 Name C</td>
        </tr>
        <tr>
            <td>L3 Name D</td>
        </tr>
    </tbody>
</table>

```

```
+-----+-----------+
|     | L2 and L3 |
| L1  +-----+-----+
|     | L2  | L3  |
+=====+=====+=====+
|     | BBB | CCC |
| AAA +-----+-----+
|     |   DDDDD   |
+-----+-----+-----+
|           | FFF |
|   EEEEE   +-----+
|           | GGG |
+-----------+-----+
```

## Visualization

### infographic

```infographic
infographic list-grid-badge-card
data
  title 年度核心指标
  desc 2025年度业绩概览
  items
    - label 总营收
      desc 12.8 亿元 | YoY +23.5%
      icon mdi/currency-usd
    - label 净利润
      desc 12.8 | YoY+23.5%
      icon mdi/chart-line
    - label 新增客户
      desc 12.8 | YoY+23.5%
      icon mdi/account-plus
      - label summary
      desc 12.8 | YoY+23.5%
      icon mdi/star
    - label 客户满意度
      desc 12.8 | YoY+23.5%
      icon mdi/chart-pie
    - label 行业领先
      desc 12.8 | YoY+23.5%
      icon mdi/refresh
```

### vega-lite

```vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "title": "A simple bar chart with embedded data.",
  "width": 500,
  "height": 300,
  "data": {
    "values": [
      {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
      {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
      {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "nominal", "axis": {"labelAngle": 0}},
    "y": {"field": "b", "type": "quantitative"}
  }
}
```

```geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 1,
      "properties": {
        "ID": 0
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
              [-90,35],
              [-90,30],
              [-85,30],
              [-85,35],
              [-90,35]
          ]
        ]
      }
    }
  ]
}
```
