- d3-tip.js - general tooltip plugin
- [This is a simple barplot with d3-tip compatible with d3.v4](https://bl.ocks.org/oikonang/b403e709777988737b50ee6ed04b2465)

```
/*在bar graph中的应用*/
//Create tip
 var tip = d3.tip()
             .attr('class', 'd3-tip')
             .offset([-10, 0])
             .html(function(d) {
                 return "<strong>Frequency:</strong> <span style='color:red'>" + d.count + "</span>";
             })

// Call the tip
svg_b.call(tip);
//  use the tip
svg_b.selectAll(".bar")
     .data(dataset_b)
                       .enter()
                       .append("rect")
                       .attr("class", "bar")
                       .attr("x", function(d) { return xScale_b(d.Category); })
                       .attr("y", function(d) { return  yScale_b(+d.count); }) //invert yaxis upside-down
                       .attr("width", xScale_b.bandwidth())
                       .attr("height", function(d,i) { return h_b - yScale_b(+d.count);})   //invert yaxis upside-down
                       .on('mouseover', tip.show)
                       .on('mouseout', tip.hide);
```

Tooltip的style

```css
.bar:hover {
                fill: grey ;
              }
.d3-tip {
             line-height: 1;
                font-weight: bold;
                padding: 12px;
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                border-radius: 2px;
}
 /* Creates a small triangle extender for the tooltip */
.d3-tip:after {
                box-sizing: border-box;
                display: inline;
                font-size: 10px;
                width: 100%;
                line-height: 1;
                color: rgba(0, 0, 0, 0.8);
                content: "\25BC";
                position: absolute;
                text-align: center;
 }
 /* Style northward tooltips differently */
.d3-tip.n:after {
                margin: -1px 0 0 0;
                top: 100%;
                left: 0;
 }
```
