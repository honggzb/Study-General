[CSS & JS Table Examples From CodePen](#top)

- [1. Accordion CSS Table](#Accordion)
- [2. Responsive Table](#Responsive)
- [3. Data Table](#data)
- [4. Price Table](#price)
  - Flip animation
  - Flag effect - css
  - hover effect

<h2 id="Accordion">1. Accordion CSS Table</h2>

```html
<style>
tr.fold {
  display: none;
  &.open { display:table-row; }
}
</style>
<table class="fold-table">
  <thead>
    <tr>
      <th>Company</th>
      <th>Amount</th>
      <th>Value</th>
      <th><span class="visible-small" title="Premiumns">Prem.</span><span class="visible-big">Premiums</span></th>
      <th><span class="visible-small" title="Strategy A">Str. A</span><span class="visible-big">Strategy A</span></th>
      <th><span class="visible-small" title="Strategy B">Str. B</span><span class="visible-big">Strategy B</span></th>
      <th><span class="visible-small" title="Strategy C">Str. C</span><span class="visible-big">Strategy C</span></th>
    </tr>
  </thead>
  <tbody>
    <tr class="view">
      <td>Company Name</td>
      <td class="pcs">457</td>
      <td class="cur">6 535 178</td>
      <td>-</td>
      <td class="per">50,71</td>
      <td class="per">49,21</td>
      <td class="per">0</td>
    </tr>
    <tr class="fold">
      <td colspan="7">   <!-- 合并单元格  -->
        <div class="fold-content">
          <!-- 折叠的内容  -->
        </div>
      </td>
    </tr>
  </tbody>
</table>
<script>
$(function(){
  $(".fold-table tr.view").on("click", function(){
    if($(this).hasClass("open")) {
      $(this).removeClass("open").next(".fold").removeClass("open");
    } else {
      $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
      $(this).addClass("open").next(".fold").addClass("open");
    }
  });
});
</script>
```

[back to top](#top)

<h2 id="Responsive">2. Responsive Table</h2>

- [Responsive Data Table Roundup](https://css-tricks.com/responsive-data-table-roundup/) on CSS-Tricks
- [10+ Solutions for Responsive Data Tables](https://www.edufukunari.com.br/10-solutions-for-responsive-data-tables/) on Exis Web

**方法1 - 利用`::before {content:`：　使用JavaScript为每个单元格添加该style格式，复制单元头内容到content**

```JavaScript
function ResponsiveCellHeaders(elmID) {
  try {
    var THarray = [];
    var table = document.getElementById(elmID);
    var ths = table.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
      var headingText = ths[i].innerHTML;
      THarray.push(headingText);
    }
    var styleElm = document.createElement("style"), styleSheet;
    document.head.appendChild(styleElm);
    styleSheet = styleElm.sheet;
    for (var i = 0; i < THarray.length; i++) {
      styleSheet.insertRule(
        "#" +
          elmID +
          " td:nth-child(" +
          (i + 1) +
          ')::before {content:"' +
          THarray[i] +
          ': ";}',
        styleSheet.cssRules.length
      );
    }
  } catch (e) {
    console.log("ResponsiveCellHeaders(): " + e);
  }
}
ResponsiveCellHeaders("Books");
```

**方法2 - 利用`::before {content:和data-label属性`**

`<td data-label="First Name">Bruce</td>`

```css
/* 每个单元格显示为一行，并在每个单元格前面加入标题 */
@media (max-width: 30em) {    
  thead tr {   /* Hide column labels */
    position: absolute;
    top: -9999em;
    left: -9999em;
  }
  tr + tr {      /* Leave a space between table rows */
    margin-top: 1.5em; 
  }
  /* Get table cells to act like rows */
  tr,  td { display: block; }
  td {
    border: none;
    border-bottom: 0.125em solid #333;
  /* Leave a space for data labels */
    padding-left: 50%;
  }
  /* Add data labels */
  td:before {
    content: attr(data-label);
    display: inline-block;
    font-weight: bold;
    line-height: 1.5;
    margin-left: -100%;
    width: 100%;
  }
}
/* /* 每个单元格显示为两行，并在每个单元格上面加入标题 ， Stack labels vertically on smaller screens */
@media (max-width: 20em) {
  td { padding-left: 0.75em; }
  td:before {
    display: block;
    margin-bottom: 0.75em;
    margin-left: 0;
  }
}
```

**方法3 - Bootstrap’s Responsive Tables**

```html
<h2>Responsive Table with Bootstrap</h2>
<div class="table-responsive">   <!-- 1) add table-responsive to div-->
  <table class="table table-bordered table-hover">
      <caption class="text-center">An example of a responsive table based on <a href="https://getbootstrap.com/css/#tables-responsive" target="_blank">Bootstrap</a>:</caption>
          <thead><!-- ...  --> </thead>
          <tbody><!-- ...  --> </tbody>
        </table>
</div><!--end of .table-responsive-->
```

https://getbootstrap.com/docs/3.3/css/

[back to top](#top)

<h2 id="data">3. Data Table</h2>

- [tablesorter jquery plugin](https://github.com/christianbach/tablesorter)
- [DataTable jquery plugin](https://datatables.net/)
  - Instant search, Pagination, Multi-column ordering, Mobile friendly
- [HeavyTable](https://github.com/victordarras/HeavyTable.js)
  - control and navigate in tables with keybord and mouse
- Fixed Table Header

```html
  <h1>Fixed Table header</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead><!-- table Header --></thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody><!-- table content --></tbody>
    </table>
  </div>
<script>
// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();
</script>
```

[back to top](#top)

<h2 id="price">4. Price Table</h2>

**Flip animation**

```html
<style>
.pricing-wrapper {perspective: 2000px;}
.pricing-wrapper.is-switched .is-visible {
  transform: rotateY(180deg);
  animation: rotate 0.5s;
}
.pricing-wrapper.is-switched .is-selected {
  opacity: 1;
}
.pricing-wrapper.is-switched.reverse-animation .is-visible {
  transform: rotateY(-180deg);
  animation: rotate-back 0.5s;
}
.pricing-wrapper.is-switched.reverse-animation .is-hidden {
  transform: rotateY(0);
  animation: rotate-inverse-back 0.5s;
  opacity: 0;
}
.pricing-wrapper.is-switched .is-hidden {
  transform: rotateY(0);
  animation: rotate-inverse 0.5s;
  opacity: 0;
}
@keyframes rotate {
  0% { transform: perspective(2000px) rotateY(0); }
  70% {transform: perspective(2000px) rotateY(200deg);}
  100% {transform: perspective(2000px) rotateY(180deg);}
}
@keyframes rotate-inverse {
  0% {transform: perspective(2000px) rotateY(-180deg);}
  70% {transform: perspective(2000px) rotateY(20deg);}
  100% {transform: perspective(2000px) rotateY(0);}
}
@keyframes rotate-back {
  0% {transform: perspective(2000px) rotateY(0);}
  70% {transform: perspective(2000px) rotateY(-200deg);}
  100% {transform: perspective(2000px) rotateY(-180deg);}
}
@keyframes rotate-inverse-back {
  0% {transform: perspective(2000px) rotateY(180deg);}
  70% {transform: perspective(2000px) rotateY(-20deg);}
  100% {transform: perspective(2000px) rotateY(0);}
}
</style>
<div class="pricing-container">
  <ul class="pricing-list bounce-invert">
    <li>
      <ul class="pricing-wrapper">
        <li data-type="monthly" class="is-visible">
          <!-- ... -->
        </li>
        <li data-type="yearly" class="is-hidden">
          <!-- ... -->
        </li>
      </ul>
    </li>
  </ul>  
</div>  
<script>
//switch from monthly to annual pricing tables
bouncy_filter($('.pricing-container'));
function bouncy_filter(container) {
  container.each(function(){
    var pricing_table = $(this);
    var filter_list_container = pricing_table.children('.pricing-switcher'),
      filter_radios = filter_list_container.find('input[type="radio"]'),
      pricing_table_wrapper = pricing_table.find('.pricing-wrapper');
    //store pricing table items
    var table_elements = {};
    filter_radios.each(function(){
      var filter_type = $(this).val();
      table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="'+filter_type+'"]');
    });
    //detect input change event
    filter_radios.on('change', function(event){
      event.preventDefault();
      //detect which radio input item was checked
      var selected_filter = $(event.target).val();
      //give higher z-index to the pricing table items selected by the radio input
      show_selected_items(table_elements[selected_filter]);
      //rotate each pricing-wrapper 
      //at the end of the animation hide the not-selected pricing tables and rotate back the .pricing-wrapper
      if( !Modernizr.cssanimations ) {
        hide_not_selected_items(table_elements, selected_filter);
        pricing_table_wrapper.removeClass('is-switched');
      } else {
        pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {		
          hide_not_selected_items(table_elements, selected_filter);
          pricing_table_wrapper.removeClass('is-switched');
          //change rotation direction if .pricing-list has the .bounce-invert class
          if(pricing_table.find('.pricing-list').hasClass('bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
        });
      }
    });
  });
}
function show_selected_items(selected_elements) {
  selected_elements.addClass('is-selected');
}
function hide_not_selected_items(table_containers, filter) {
  $.each(table_containers, function(key, value){
      if ( key != filter ) {	
      $(this).removeClass('is-visible is-selected').addClass('is-hidden');

    } else {
      $(this).addClass('is-visible').removeClass('is-hidden is-selected');
    }
  });
}
</script>
```

**with Flag effect- css**

`<p class="promo">Our most valuable package!</p>`

```css
th p.promo {
  position: absolute;
  top: 9em;
  left: -17px;
  z-index: 1000;
  width: 100%;
  margin: 0;
  padding: .625em 17px .75em;
  background: #c00;
  box-shadow: 0 2px 4px rgba(0,0,0,.25);
  border-bottom: 1px solid #900;
}
th p.promo:before {
  content: "";
  position: absolute;
  display: block;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 7px 7px 0;
  border-color: transparent #900 transparent transparent;
  bottom: -7px;
  left: 0;
}
thead th p.promo:after {
  content: "";
  position: absolute;
  display: block;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 7px 7px 0 0;
  border-color: #900 transparent transparent transparent;
  bottom: -7px;
  right: 0;
}
```

**hover effect 1 - css**

```html
<style>
.grid-1-5:hover {
  background-color: rgb(83,69,91);
  @include filter-gradient(#53455b, #201d22, vertical);
  @include background-image(linear-gradient(top,  rgba(83,69,91,1) 0%,rgba(32,29,34,1) 100%));  
  border-top: 2px solid #ec7a37;
  border-bottom: 2px solid #ff4f69;
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 1);
  transform: scale(1.025);
  z-index: 2;
  &:before, &:after {
    content: ""; 
    position: absolute; 
    background-color: rgb(246,125,53);
    @include filter-gradient(#f67d35, #ff4f68, vertical);
    @include background-image(linear-gradient(top,  rgba(246,125,53,1) 0%,rgba(255,79,104,1) 100%));
    top: -2px; 
    bottom: -2px; 
    width: 2px;    
  }
  &:before { 
    left: -2px; 
  }
  &:after { 
    right: -2px; 
  }  
.grid-1-5:hover .button {
  background-color: #ee7a36;
  filter: progid:DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#FFEE7A36', endColorstr='#FFEB495D');
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiP…dpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==);
  background-size: 100%;
  background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #ee7a36), color-stop(100%, #eb495d));
  background-image: -moz-linear-gradient(left, #ee7a36 0%, #eb495d 100%);
  background-image: -webkit-linear-gradient(left, #ee7a36 0%, #eb495d 100%);
  background-image: linear-gradient(to right, #ee7a36 0%, #eb495d 100%);
}
//css
.grid-1-5:hover:before, .grid-1-5:hover:after {
  content: "";
  position: absolute;
  background-color: #f67d35;
  filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FFF67D35', endColorstr='#FFFF4F68');
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiP…dpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==);
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #f67d35), color-stop(100%, #ff4f68));
  background-image: -moz-linear-gradient(top, #f67d35 0%, #ff4f68 100%);
  background-image: -webkit-linear-gradient(top, #f67d35 0%, #ff4f68 100%);
  background-image: linear-gradient(to bottom, #f67d35 0%, #ff4f68 100%);
  top: -2px;
  bottom: -2px;
  width: 2px;
}
</style>
<div class="grid-1-5">
	<!--- some content-->
	<a href="" class="button">Sign Up</a>		
</div>
```

https://codepen.io/mtorosian/pen/KwyrZa

**hover effect 2 -css**

```css
.pricingTable-firstTable_table {
  vertical-align: middle;
  width: 31%;
  background-color: #ffffff;
  display: inline-block;
  padding: 0px 30px 40px;
  text-align: center;
  max-width: 320px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border-radius: 5px;
}
.pricingTable-firstTable_table:hover {
  -webkit-transform: scale(1.08);      /*扩大*/
  transform: scale(1.08);
}
.pricingTable-firstTable_table:nth-of-type(2):hover:before {
  -webkit-transform: rotate(360deg);    /*旋转*/
  transform: rotate(360deg);
}
/* circle on the top-right corner*/
.pricingTable-firstTable_table:nth-of-type(2):before {
  content: 'Most Popular';
  position: absolute;
  color: white;
  display: block;
  background-color: #3bbdee;
  text-align: center;
  right: 15px;
  top: -25px;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 0.5em;
  padding-top: 22px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
```

https://codepen.io/VoloshchenkoAl/pen/NABNoN

**hover effect 3 -css**

```html
<div class="plan pro" onclick="void(0);">...</div>
<div class="datas">
  <div class="data users">
  			<div class="text">
  				<span class="left">5 Users</span>
  				<span class="right">100 Users</span>
  			</div>
  			<div class="line"><div class="fill"></div></div>
  	</div>
  	<div class="data gb">
  			<div class="text">
  				<span class="left">20 GB</span>
  				<span class="right">200 GB</span>
  			</div>
  			<div class="line"><div class="fill"></div></div>
  	</div>
  	<div class="data projects">
  			<div class="text">
  				<span class="left">1 Project</span>
  				<span class="right">50 Projects</span>
  			</div>
  			<div class="line"><div class="fill"></div></div>
  	</div>
</div>
```

```css
/* 放大  */
.plan:hover {
  -webkit-transform: scale(1.1) translate3d(0, 0, 0);
  transform: scale(1.1) translate3d(0, 0, 0);
  -webkit-box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.1);
}
/* 鼠标悬浮到plan div时候，fill产生的动画效果 */
.plan.pro {
  left: 145px;
  &:hover {
    ~ .datas .users .fill {
      transform: scaleX(0.3) translate3d(0,0,0);
    }
    ~ .datas .gb .fill {
      transform: scaleX(0.7) translate3d(0,0,0);				
    }
    ~ .datas .projects .fill{
      transform: scaleX(0.5) translate3d(0,0,0);
    }
  }
}
```

https://codepen.io/roydigerhund/pen/VayMGJ

[back to top](#top)

> Reference
> - [CSS & JS Table Examples From CodePen](https://freebiesupply.com/blog/css-tables/)
> - Koala
> - [scss online tool](http://sass.js.org/)
