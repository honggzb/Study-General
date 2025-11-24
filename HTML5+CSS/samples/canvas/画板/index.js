canvas.width = window.innerWidth - 300
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")

// 是否绘画标记
var isDraw = false
// 属性
const props = {
    color: "#000",
    size: 3
}

// 修改颜色
color.onchange = function () {
    props.color = this.value
}
// 粗细
size.onchange = function () {
    props.size = this.value
}

// 状态列表
const statusArr = []
var statusIndex = 0

function addStatus() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    statusArr.push(imageData)
    statusIndex++
}

function draw(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = props.color
    ctx.lineWidth = props.size
    ctx.moveTo(x, y)
}
// 鼠标按下开始
canvas.onmousedown = (e) => {
    isDraw = true
    draw(e.x, e.y)
}
// 移动绘画
canvas.onmousemove = (e) => {
    if (isDraw) {
        ctx.lineTo(e.x, e.y)
        ctx.stroke()
    }
}
//停止绘画
canvas.onmouseup = () => {
    isDraw = false
    ctx.closePath()
    addStatus()
}
// 撤销
function handle(e){
    if(e.target.dataset.type == "back"){
        statusIndex--
    }else{
        statusIndex++
    }
    let imageData = statusArr[statusIndex]
    ctx.putImageData(imageData,0,0)
}
reback.onclick = handle
cancelreback.onclick = handle

// 清空
clear.onclick = ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
// 下载
downLoand.onclick = ()=>{
    let src = canvas.toDataURL("image/png")
    let a = document.createElement("a")
    a.href = src
    a.download = `画板${new Date()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}