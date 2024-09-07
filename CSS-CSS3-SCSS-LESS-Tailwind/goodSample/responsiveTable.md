## Responsive Data Tables

- [solution 1 - using `content: attr(data-content)`](#using-content)
- [solution 2 - adding extra html tag before td, using jquery to control style display](#adding-extra-html-tag)
- [solution 3 - pure CSS Solution](#pure-CSS-Solution)

<h3 id="using-content">solution 1 - using `content: attr(data-content)`</h3>

** sample 1 - `http://codepen.io/dudleystorey/pen/Geprd` **

```javascript
var headertext = [],
headers = document.querySelectorAll("#miyazaki th"),
tablerows = document.querySelectorAll("#miyazaki th"),
tablebody = document.querySelector("#miyazaki tbody");
for(var i = 0; i < headers.length; i++) {
  var current = headers[i];
  headertext.push(current.textContent.replace(/\r?\n|\r/,""));
} 
for (var i = 0, row; row = tablebody.rows[i]; i++) {
  for (var j = 0, col; col = row.cells[j]; j++) {
    col.setAttribute("data-th", headertext[j]);
  } 
}
```

** sample 2 - `http://www.netgenlabs.com/Blog/Responsive-Data-Tables-with-ngResponsiveTables-jQuery-plugin` **

<h3 id="adding-extra-html-tag">solution 2 - adding extra html tag before td, using jquery to control style display</h3>

```html
<div class="ot-metadata-table">
	<div class="ot-metadata-table-header">
			<span class="ot-metadata-table-header-entry">Right Holder Name</span>
      <span class="ot-metadata-table-header-entry>Right Holder Type</span>
  </div>
  <div class="ot-metadata-table-row">
			<span class="ot-metadata-table-row-entry">
        <span class="table-cell-label">Right Holder Name</span>
				<ot-metadata>UNKNOWN</ot-metadata>
			</span>
      <span class="ot-metadata-table-row-entry">
        <span class="table-cell-label">Right Holder Type</span>
				<ot-metadata>EXTERNAL</ot-metadata>
			</span>
    </div>
</div>
```

<h3 id="pure-CSS-Solution">solution 3 - pure CSS Solution</h3>

```css
// sass style  -- http://codepen.io/pixelchar/pen/rfuqK
@import "bourbon";
// Breakpoints
$bp-maggie: 15em; 
$bp-lisa: 30em;
$bp-bart: 48em;
$bp-marge: 62em;
$bp-homer: 75em;
* {
 @include box-sizing(border-box);
 &:before, &:after {
   @include box-sizing(border-box);
 }
}
.container {
  margin: 5% 3%;
  @media (min-width: $bp-bart) {
    margin: 2%; 
  }
  @media (min-width: $bp-homer) {
    margin: 2em auto;
    max-width: $bp-homer;
  }
}
.responsive-table {
  width: 100%;
  margin-bottom: 1.5em;
  @media (min-width: $bp-bart) {
    font-size: .9em; 
  }
  @media (min-width: $bp-marge) {
    font-size: 1em; 
  }
  thead {
    // Accessibly hide <thead> on narrow viewports
    position: absolute;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px; 
    width: 1px; 
    overflow: hidden;
    @media (min-width: $bp-bart) {
      // Unhide <thead> on wide viewports
      position: relative;
      clip: auto;
      height: auto;
      width: auto;
      overflow: auto;
    }
    th {
      background-color: rgba(29,150,178,1);
      border: 1px solid rgba(29,150,178,1);
      font-weight: normal;
      text-align: center;
      color: white;
      
      &:first-of-type {
        text-align: left; 
      }
    }
  }
  // Set these items to display: block for narrow viewports
  tbody,
  tr,th,td {
    display: block;
    padding: 0;
    text-align: left;
    white-space: normal;
  }
  tr {   
    @media (min-width: $bp-bart) {
      // Undo display: block 
      display: table-row; 
    }
  }
  th,td {
    padding: .5em;
    vertical-align: middle;
    @media (min-width: $bp-lisa) {
      padding: .75em .5em; 
    }
    @media (min-width: $bp-bart) {
      // Undo display: block 
      display: table-cell;
      padding: .5em;
    }
    @media (min-width: $bp-marge) {
      padding: .75em .5em; 
    }
    
    @media (min-width: $bp-homer) {
      padding: .75em; 
    }
  }
  tbody {
    @media (min-width: $bp-bart) {
      // Undo display: block 
      display: table-row-group; 
    }
    tr {
      margin-bottom: 1em;
      border: 2px solid rgba(29,150,178,1);
      @media (min-width: $bp-bart) {
        // Undo display: block 
        display: table-row;
        border-width: 1px;
      }
      &:last-of-type {
        margin-bottom: 0; 
      }
      &:nth-of-type(even) {
        @media (min-width: $bp-bart) {
          background-color: rgba(94,93,82,.1);
        }
      }
    }
    th[scope="row"] {
      background-color: rgba(29,150,178,1);
      color: white;
      @media (min-width: $bp-bart) {
        background-color: transparent;
        color: rgba(94,93,82,1);
        text-align: left;
      }
    }
    td {
      text-align: right;
      @media (min-width: $bp-lisa) {
        border-bottom: 1px solid  rgba(29,150,178,1);
      }
      @media (min-width: $bp-bart) {
        text-align: center; 
      }
    }
    td[data-type=currency] {
      text-align: right; 
    }
    td[data-title]:before {
      content: attr(data-title);
      float: left;
      font-size: .8em;
      color: rgba(94,93,82,.75);
      @media (min-width: $bp-lisa) {
        font-size: .9em; 
      }
      @media (min-width: $bp-bart) {
        content: none;   // Don’t show data-title labels 
      }
    } 
  }
}

//other solution - using display:block and data attributes(http://codepen.io/geoffyuen/pen/FCBEg)
```

> Reference

- [10+ Solutions for Responsive Data Tables](http://sitesforprofit.com/responsive-table-plugins-and-patterns)
