- [关于文件下载功能的说明](#关于文件下载功能的说明)
- [Export HTML table to excel with text and images](#HTML)
	- [Bug 1: warning message bug - "The file format and extension of 'file.xls' donnot match with"](#warning)
	- [Bug 2: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range](#bug2)
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

<h2 id="warning">Bug 1: warning message bug - "The file format and extension of 'file.xls' donnot match with"</h2>

**Reason**

The issue is caused by a new security feature in Excel. Older version Excel did not have this security issue.

http://blogs.msdn.com/b/vsofficedeveloper/archive/2008/03/11/excel-2007-extension-warning.aspx

**solution1:**  set the responseType to blob on my HTTP request.

```JavaScript
$http({
    url: 'your/webservice',
    method: "POST",
    data: json, //this is your json data string
    headers: {
       'Content-type': 'application/json'
    },
    responseType: 'blob'
}).success(function (data, status, headers, config) {
    var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    var objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl);
}).error(function (data, status, headers, config) {
    //upload failed
});
```

refer to : https://stackoverflow.com/questions/22447952/angularjs-http-post-convert-binary-to-excel-file-and-download/22448640

**solution2:** set html meta tag to 

```html
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns="http://www.w3.org/TR/REC-html40">
<meta http-equiv=Content-Type content="text/html; charset=windows-1252"/>
<meta name=ProgId content=Excel.Sheet/>
<meta name=Generator content="Microsoft Excel 11"/>
```

**solution3:** 

It can only be fixed by changing Windows registry settings

```shell
Key: HKEY_CURRENT_USER\Software\Microsoft\Office\12.0\Excel\Security
Value: (DWORD)"ExtensionHardening" = [0 = Disable check; 1 = Enable check and prompt; 2 = Enable check, no prompt deny open]
```

Default setting if value not present is 1 (enable and prompt).

[back to top](#top)

<h2 id="bug2">Bug 2: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
</h2>

**Reason**: The simple truth is, atob doesn't really handle UTF8-strings - it's ASCII only.

**Solution 1"**:  https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_strings 

`btoa(unescape(encodeURIComponent(str)))`, it work with SVG source too. 

```javascript
// ucs-2 string to base64 encoded ascii - encode to base64
function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string- decode base64
function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
// Usage:
utoa('✓ à la mode'); // 4pyTIMOgIGxhIG1vZGU=
atou('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
utoa('I \u2661 Unicode!'); // SSDimaEgVW5pY29kZSE=
atou('SSDimaEgVW5pY29kZSE='); // "I ♡ Unicode!"
// if you need to get this to work in mobile-safari, you might need to strip all the white-space from the base64 data
function b64_to_utf8( str ) {
    str = str.replace(/\s/g, '');    
    return decodeURIComponent(escape(window.atob( str )));
}
//my OTMM project: changing to 
base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
// it work with SVG too
var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(markup)));
var img = new Image(1, 1); // width, height values are optional params 
img.src = imgsrc;
```

https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

**Solution 2**: using third javascript library

2017 Update: if string contain URL valid characters

1.  [webtoolkit](http://www.webtoolkit.info/) does have a small, nice and very maintainable implementation:

```javascript
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info
*
**/
var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    // public method for encoding
    , encode: function (input)
    {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length)
        {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        } // Whend 

        return output;
    } // End Function encode 
    // public method for decoding
    ,decode: function (input)
    {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length)
        {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64)
            {
                output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64)
            {
                output = output + String.fromCharCode(chr3);
            }

        } // Whend 

        output = Base64._utf8_decode(output);

        return output;
    } // End Function decode 
    // private method for UTF-8 encoding
    ,_utf8_encode: function (string)
    {
        var utftext = "";
        string = string.replace(/\r\n/g, "\n");

        for (var n = 0; n < string.length; n++)
        {
            var c = string.charCodeAt(n);

            if (c < 128)
            {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048))
            {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else
            {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        } // Next n 

        return utftext;
    } // End Function _utf8_encode 
    // private method for UTF-8 decoding
    ,_utf8_decode: function (utftext)
    {
        var string = "";
        var i = 0;
        var c, c1, c2, c3;
        c = c1 = c2 = 0;
        while (i < utftext.length)
        {
            c = utftext.charCodeAt(i);
            if (c < 128)
            {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224))
            {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else
            {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        } // Whend 
        return string;
    } // End Function _utf8_decode 

}
shareimprove this answer
```

2. [fileSaver.js](https://github.com/eligrey/FileSaver.js/)
3. [js-base64](https://github.com/dankogai/js-base64)
4. Use (experimental) URL.createObjectURL

```javascript
console.log(URL.createObjectURL(blob));
//Prints: blob:http://stackoverflow.com/7c18953f-f5f8-41d2-abf5-e9cbced9bc42
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
