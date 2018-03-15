## Export HTML table to excel with text and images - jquery

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

var ctx = {worksheet: "name" || 'Worksheet', table: tableHTML}

var file = new Blob([tableHTML], {type:"application/vnd.ms-excel"});
var url = URL.createObjectURL(file);
var a = $("<a />", {
    href: url,
    download: "filename.xls"
  }).appendTo("body").get(0).click();
$(a).remove();
</script>
<!-- javascript -->
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



