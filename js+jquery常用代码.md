[top](#top)

- [1. select跳转](#1. select跳转)
- [2. 判断http协议+Chrome和版本](#判断Chrome和版本)
- [6.3 'Pure' Pipe limitation && 'Impure' pipe](#Impure-pipe)

<h3 id="select跳转">1. select跳转</h3>

```javascript
//1) select加链接
function mbar(sobj) {
  var docurl =sobj.options[sobj.selectedIndex].value;
  if (docurl != "") {
     open(docurl,'_blank');
     sobj.selectedIndex=0;
     sobj.blur();
  }
}
<Select onchange=mbar(this) name="select">
  <OPTION selected>=== 合作伙伴 ===</OPTION>
  <OPTION value="http://www.baidu.com">百度</OPTION>
  <OPTION value="http://www.163.com">网易</OPTION>
</Select>
//2) location.href
<select name="pageselect" onchange="self.location.href=options[selectedIndex].value" >
  <OPTION value="http://www.baidu.com">百度</OPTION>
  <OPTION value="http://www.163.com">网易</OPTION>
</select>
//3) select选择-按钮跳转
function setsubmit(){
  if(mylink.value == 0)
   window.location='http://www.baidu.com';
  if(mylink.value == 1)
    window.location='http://www.163.com';
}
<select name="mylink" id="mylink">
  <OPTION value="0">百度</OPTION>
  <OPTION value="1">网易</OPTION>
</select>
<input type="button" id="btn" value="提交" onclick="setsubmit(this)" />
```

[back to top](#top)

<h3 id="判断Chrome和版本">2. 判断http协议+Chrome和版本</h3>

```javascript
if (!location.protocol.match('https')) {
  showErrorMsg('You may need to run this app from https.');
}
if (!(navigator.userAgent.match('Chrome') &&
      parseInt(navigator.userAgent.match(/Chrome\/(.*) /)[1]) >= 26)) {
  showErrorMsg('You need Chrome 26+ to run this demo properly.');
}
if (e.code == e.PERMISSION_DENIED) {
      showErrorMsg('PERMISSION_DENIED. Are you no SSL? Have you enabled the --enable-usermedia-screen-capture flag?');
}
```

[back to top](#top)

