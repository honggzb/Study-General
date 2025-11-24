
window.onload = function () {

    let str = `
/*
* Hi。亲爱的！
* 这么久了。还没和亲爱的说过我的工作呢！
* 我是个前端工程师。俗称程序员。网页相关。
* 如这个页面。就是个什么也没有的网页。
* 我的工作就是给这种空白的页面加点儿东西。
* 比如，这个页面太单调了
* 给背景加个颜色
*/

 .content{
    background-color: #6d3333;
 }

/*设置一下文字样式*/

.text{
    color: #08bf4e;
    fot-weight:bold;
    font-size: 25px;
}

/*我来教亲爱的画一个简单的爱心*/

.heart {
    width: 200px;
    height: 200px;
    background-color: red;
    position: relative;
    top:220px;
    right:300px;

    /*先预写动画*/

    animation: animation 2s linear infinite;
    margin: 0 30px;
    rotate: 45deg;
}

/*先画上爱心的左心房*/

.heart::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    left: -50%;
    background-color: red;
}

/*再画上爱心的右心房*/

.heart::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: -50%;
    background-color: red;
}

/*让爱心动起来*/

@keyframes animation {
    0% {
    transform: scale(1) ;
    opacity: 1;
  }

  100% {
    transform: scale(1.65) ;
    opacity: 0
  }
}

/*
* Ok，完成！
* 感谢亲爱的观看！
*/
`

    // style标签
    let stylelink = document.getElementById("stylelink")
    // 文字容器
    let text = document.querySelector(".text")
    //播放按钮
    let play = document.querySelector(".play")
    let innerText = ""

    // 点击播放
    play.onclick = function () {
        document.querySelector(".content").removeChild(play)
        document.querySelector("audio").play()
        setTimeout(() => {
            load()
        }, 1000)
    }

    let i = 0

    function load() {
        if(i>=str.length) return
        i++
        innerText += str[i]
        stylelink.innerHTML = innerText
        text.innerHTML = innerText
        text.scrollTop += 30
        // 递归调用
        setTimeout(()=>{
            load()
        },60)
    }

}



/*

*/