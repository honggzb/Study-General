- [关于文件下载功能的说明](#关于文件下载功能的说明)
- [Export HTML table to excel with text and images](#HTML)
- [Export HTML to csv](#csv)
- [Reference: VBA- Convert The Image URLs To Actual Images](#Reference)

<h2 id="关于文件下载功能的说明">关于文件下载功能的说明</h2>

- [download.js](https://stackoverflow.com/questions/16376161/javascript-set-filename-to-be-downloaded/), https://github.com/rndme/download/blob/master/download.js
- [Better approach to download file in JavaScript](http://pixelscommander.com/javascript/javascript-file-download-ignore-content-type/)

| 浏览器类型 | 适用方法/属性 |
| ------------- | :------------- |
|Chrome, FF| HTML5 download attribute, `<a href="/files/xxx.pdf" download="xxx.pdf">下载费用表</a>`(look like worked for safari)|
|IE|IE不支持download，使用Blob, `window.navigator.msSaveBlob`|
|Safari|Safari不支持download和Blob，使用window.open(url)|

**Issues with window.open()**

```javascript
window.downloadFile = function(sUrl) {
    window.open(sUrl);
}
```

Problem

- get useless empty window in Chrome or Safari;
- Probably file's content-type will command browser to show file's content in new window and not to download it. It's not expected behavior for downloading function

Solution

- avoid annoying new window opening:  `window.open(sUrl, '_self');`
- add a virtual link and virtual click: Click on link method also have not such problem as empty window in Chrome or Safari. Bad thing is that it's user-generated event. However we can create hidden link and programmatically click on it by dispatching new mouse event
 - use HTML5 “download” attribute

```javascript
if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
    //Creating new link node.
    var link = document.createElement('a');
    link.href = sUrl;
    //Dispatching click event.
    if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click' ,true ,true);
        link.dispatchEvent(e);
        return true;
    }
```

**Issues with Safari**

- Blob is not supported: This has been solved with Blob.js using BlobBuilder as fallback and then base64 data uri if that are not supported either
- URL.createObjectUrl: Has been covered by both FileSaver.js and blob.js
  - Blob.js overrule createObjectUrl with it's own base64 url constructor only if it's a "fake blob" (i.e not a File or Blob representation) it will use window.URL, fallback to window.webkitURL or use it's own base64 function to create those "fake blobs" data-uri
- The "can't open blob url" issue (partly supported) 
- This is mostly cased by unsupported mime type, Safari do support opening blob url, but only if it's a mimetype that safari can understand like simple plain/text or a common image like image/png.
  - FileSaver.js looks at the mimetype to see if it is application/octet-stream (wish is commonly used to force saving files from the server)
- The blank page error partial supported - (formuly known as "can't open blob url", see above)

```javascript
window.onclick = function(){
    setTimeout(function(){
        var blob = new Blob(["Hi"], {type: 'application/octet-stream'});
        var url = URL.createObjectURL(url);
        window.open(url);
    }, 950); // Any longer then 1sec will make the window.open blocked again
}
```

- If you replace window.open with location.href = you will get the Failed to load resource: Frame load interrupted and be unable to save the file that is not the case for all mimetype, mimetypes that Safari can display can be opened this way
- A little side note here is that window.open only works on trusted events meaning:
  - It will only be able to open the url when user interacts with the website like a onclick event (more about isTrusted event here - almost pointless becuse browser support)
  - I have also found out that the trusted event persist for 1000 ms

**the conclusion here about safari**

1. download attribute in safari is not supported
2. It will try other means to save the blob by opening a new url
3. If the mimetype can be rendered by safari it will be able to display it in a new tab
4. If the mimetype is `application/octet-stream`:
	1) Create a base64 link with FileReader api
	2) try to open a new tab using window.open + base64 url
	3) if it was more then 1 sec before the user interaction happened it will use the current page instead but that is likely going to fail because (see first example using location.href) Failed to load resource: Frame load interrupted This may still work if the mimetype is not application/octet-stream and the saveAs was not called synchronous
5. Safari don't have anything like msSaveAs()
6. safest way to force the file to be saved is to have a data:attachment/file" + base64 ready and open that link using window.open() when the user interacts with the website (or at least to it under 1 second)
7. when saving it as a attachment filename will be "unknown"

https://github.com/eligrey/FileSaver.js/issues/12

**简化版本的download.js**

```javascript
function download(strData, strFileName, strMimeType) {
    var D = document,
        a = D.createElement("a");
        strMimeType= strMimeType || "application/octet-stream";
    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
    } /* end if(navigator.msSaveBlob) */
    if ('download' in a) { //html5 A[download]
        a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
        a.setAttribute("download", strFileName);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            a.click();
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */
    //do iframe dataURL download (old ch+FF):
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" +  strMimeType   + "," + encodeURIComponent(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
} /* end download() */
```

Complete listing for download.js:  http://pixelscommander.com/javascript/javascript-file-download-ignore-content-type/

```javascript
window.downloadFile = function(sUrl) {
    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
 
        if (link.download !== undefined){
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
 
        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click' ,true ,true);
            link.dispatchEvent(e);
            return true;
        }
    }
 
    // Force file download (whether supported by server).
    var query = '?download';
 
    window.open(sUrl + query);
}
window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') &gt; -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') &gt; -1;
```

[back to top](#top)

<h2 id="HTML">Export HTML table to excel with text and images</h2>

```javascript
<script type="text/javascript">
$("#btnExport").click(function(e) {
  let file = new Blob([$('.divclass').html()], {type:"application/vnd.ms-excel"});
  let url = URL.createObjectURL(file);
  let a = $("<a />", {
    href: url,
    download: "filename.xls"
  }).appendTo("body").get(0).click();
  e.preventDefault();
});
</script>
<!-- 完整版 -->
<div id="divTableDataHolder">
    <title>Demo for huge data</title>
    <table id="myTable">
        <thead>
            <tr><th colspan="5">Demoe By <a href="http://codePattern.net/blog">CodePattern.net</a></th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Anil Kumar</td><td>2012</td><td>Delhi</td><td>India</td><td><img src='http://codepattern.net/Blog/pics/CodepatternLogoN.png' alt=''/></td>
          </tr>
          <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
          <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
          <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
          <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
        </tbody>
    </table>
</div>
<script>
var tableHTML = $('#divTableDataHolder').html();
let uri = 'data:application/vnd.ms-excel;base64,', 
template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>', 
base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) },         
format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
var aTest = document.createElement("a");
if(window.navigator && window.navigator.msSaveBlob){
			// hate IE
	    var file = new Blob([tableHTML], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
	    window.navigator.msSaveBlob(file, "newfile.xls");
      $(aTest).remove();
}else if(URL && 'download' in aTest){
			// Browsers that support HTML5 download attribute
		  var ctx = {worksheet: "assets" || 'Worksheet', table: tableHTML};
			var aExportToExcel = $("<a />", {
			    href: uri + base64(format(template, ctx)),
			    download: "newfile.xls"
		  	}).appendTo("body").get(0).click();
			$(aExportToExcel).remove();
			$(aTest).remove();
// }else{
    //  // ios safari ????
		// 		//var file = new Blob([tableHTML], {type: 'data:application/octet-stream'});  
	  //     //var url = URL.createObjectURL(file);
		// 		//setTimeout(function(){
	  //     window.open('data:application/octet-stream,'+encodeURIComponent(tableHTML));    // only this mime type or text is supported
		// 		document.body.removeChild(aTest);
		// 		//}, 950);   //must less than 1000
</script>
<!-- javascript -->
<script type="text/javascript">
$("[id$=myButtonControlID]").click(function(e) {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTableDataHolder]').html()));
    e.preventDefault();
});
</script>
```

> note: HTML5 download attribute(look like worked for safari)

**Exporting HTML To Excel in IE11** – warning: “Access is Denied”

```
if window.navigator and window.navigator.msSaveOrOpenBlob
      blob = new Blob([ data ], type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      window.navigator.msSaveOrOpenBlob blob
else 
      blob = new Blob([ data ], type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      objectUrl = URL.createObjectURL(blob)
      window.open objectUrl
```


[back to top](#top)

<h2 id="csv">Export HTML to csv</h2>

```javascript
// Example data given in question text
var data = [
  ['name1', 'city1', 'some other info'],
  ['name2', 'city2', 'more info']
];

// Building the CSV from the Data two-dimensional array
// Each column is separated by ";" and new line "\n" for next row
var csvContent = '';
data.forEach(function(infoArray, index) {
  dataString = infoArray.join(';');
  csvContent += index < data.length ? dataString + '\n' : dataString;
});
// The download function takes a CSV string, the filename and mimeType as parameters
// Scroll/look down at the bottom of this snippet to see how download is called
var download = function(content, fileName, mimeType) {
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
  }
}
download(csvContent, 'dowload.csv', 'text/csv;encoding:utf-8');
```

[back to top](#top)

<h2 id="Reference">Reference: VBA- Convert The Image URLs To Actual Images</h2>

1. Hold down the ALT + F11 keys to open the Microsoft Visual Basic for Applications window.
2. Click Insert > Module, and paste the following code in the Module Window.
3. press Alt + F8 to run

```vb
Sub URLPictureInsert()
'Updateby Extendoffice 20161116
    Dim Pshp As Shape
    Dim xRg As Range
    Dim xCol As Long
    On Error Resume Next
    Application.ScreenUpdating = False
    Set Rng = ActiveSheet.Range("A2:A6")
    For Each cell In Rng
        filenam = cell
        ActiveSheet.Pictures.Insert(filenam).Select
        Set Pshp = Selection.ShapeRange.Item(1)
        If Pshp Is Nothing Then GoTo lab
        xCol = cell.Column + 1
        Set xRg = Cells(cell.Row, xCol)
        With Pshp
            .LockAspectRatio = msoFalse
            .Width = 100
           .Height = 100
            .Top = xRg.Top + (xRg.Height - .Height) / 2
            .Left = xRg.Left + (xRg.Width - .Width) / 2
        End With
lab:
    Set Pshp = Nothing
    Range("A2").Select
    Next
    Application.ScreenUpdating = True
End Sub
```

- https://www.extendoffice.com/documents/excel/4212-excel-insert-image-from-url.html
- https://stackoverflow.com/questions/17126453/html-table-to-excel-javascript
- https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
