### Export a div content To Excel

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

### Export HTML table to excel with text and images - jquery

```html
<button id="myButtonControlID">Export Table data into Excel</button>
  <div id="divTableDataHolder">
      <title>Demo for huge data</title>
      <table>
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
<script type="text/javascript">
$("[id$=myButtonControlID]").click(function(e) {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTableDataHolder]').html()));
    e.preventDefault();
});
</script>
```

> Reference: VBA- Convert The Image URLs To Actual Images

1. Hold down the ALT + F11 keys to open the Microsoft Visual Basic for Applications window.
2. Click Insert > Module, and paste the following code in the Module Window.
3. press F5 to run

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

