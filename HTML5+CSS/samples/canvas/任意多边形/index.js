
const canvas = document.getElementById("canvas");

// 设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// 绘画函数
function draw(n) {
    // 图形大小
    let len = 300;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "aqua"
    ctx.lineWidth = 5;
    // 移入中心
    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.moveTo(0, 0 - len);

    // 根据传入数量绘画
    for (let i = 0; i < n; i++) {
        ctx.lineTo(0, 0 - len);
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (len * 0.5));
        ctx.rotate(Math.PI / n);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore()
}
// draw(4)
input.onchange = function(e){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    draw(e.target.value)
}