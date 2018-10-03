//1) jquery已支持Promise的异步调用
var data = {};   //global variable
$.get('http://127.0.0.1:3000/users/4')
    .then(function (data1) {
        data.user = data1;
        return $.get('http://127.0.0.1:3000/jobs')
    })
    .then(function (data2) {
        data.jobs = data2;
        console.log(data);
    })
// 2) 自定义
var data = {};   //global variable
pGet('http://127.0.0.1:3000/users/4')
      .then(function (data) {
         data.user = data1;
         return pGet('http://127.0.0.1:3000/jobs')
      })
      .then(function (data) {
        data.jobs = data2;
        console.log(data);
      })
//也支持
pGet('http://127.0.0.1:3000/users/4', function(data){
      console.log(data);
 })
function pGet(url, callback) {
   return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest()
        // 当请求加载成功之后要调用指定的函数
        oReq.onload = function () {
          // 得到这里的 oReq.responseText
          callback && callback(JSON.parse(oReq.responseText))   //也支持callback
          resolve(JSON.parse(oReq.responseText))
        }
        oReq.onerror = function (err) {
          reject(err)
        }
        oReq.open("get", url, true)
        oReq.send()
  })
}
//callback方式的API
/*function get(url, callback) {
  var oReq = new XMLHttpRequest()
      // 当请求加载成功之后要调用指定的函数
  oReq.onload = function () {
        // 我现在需要得到这里的 oReq.responseText
        callback(oReq.responseText)
  }
  oReq.open("get", url, true)
  oReq.send()
}*/
