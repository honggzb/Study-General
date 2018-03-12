## Export a div content To Excel

```javascript
$("#btnExport").click(function(e) {
  let file = new Blob([$('.divclass').html()], {type:"application/vnd.ms-excel"});
  let url = URL.createObjectURL(file);
  let a = $("<a />", {
    href: url,
    download: "filename.xls"
  }).appendTo("body").get(0).click();
  e.preventDefault();
});
```


```javascript
if (isIe) {
    document.addEventListener('beforepaste', function() {
        if (hiddenInput.is(':focus')) {
            focusIeClipboardDiv();
        }
    }, true);
}
var ieClipboardEvent = function(clipboardEvent) {
    var clipboardData = window.clipboardData;
    if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
        clipboardData.setData('Text', textToCopy);
        ieClipboardDiv.html(htmlToCopy);
        focusIeClipboardDiv();
        setTimeout(function() {
            focusHiddenArea();
            ieClipboardDiv.empty();
        }, 0);
    }
    if (clipboardEvent == 'paste') {
        var clipboardText = clipboardData.getData('Text');
        ieClipboardDiv.empty();
        setTimeout(function() {
            console.log('Clipboard Plain Text: ' + clipboardText);
            console.log('Clipboard HTML: ' + ieClipboardDiv.html());
            ieClipboardDiv.empty();
            focusHiddenArea();
        }, 0);
    }
};
```
