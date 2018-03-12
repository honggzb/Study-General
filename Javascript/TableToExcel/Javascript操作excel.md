## Export a div content To Excel

```javascript
$("#btnExport").click(function(e) {
  let file = new Blob([$('.divclass').html()], {type:"application/vnd.ms-excel"});
  let url = URL.createObjectURL(file);
  let a = $("<a />", {
  href: url,
  download: "filename.xls"}).appendTo("body").get(0).click();
  e.preventDefault();
});
```
