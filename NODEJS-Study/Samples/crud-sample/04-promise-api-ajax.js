pGet('http://127.0.0.1:3000/users/4')
      .then(function (data) {
        console.log(data)
      })

function pGet(url, callback) {
   return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest()
        // 当请求加载成功之后要调用指定的函数
        oReq.onload = function () {
          // 我现在需要得到这里的 oReq.responseText
          callback && callback(JSON.parse(oReq.responseText))
          resolve(JSON.parse(oReq.responseText))
        }
        oReq.onerror = function (err) {
          reject(err)
        }
        oReq.open("get", url, true)
        oReq.send()
  })
}
    // 这个 get 是 callback 方式的 API
    // 可以使用 Promise 来解决这个问题
function get(url, callback) {
  var oReq = new XMLHttpRequest()
      // 当请求加载成功之后要调用指定的函数
  oReq.onload = function () {
        // 我现在需要得到这里的 oReq.responseText
        callback(oReq.responseText)
  }
  oReq.open("get", url, true)
  oReq.send()
}
