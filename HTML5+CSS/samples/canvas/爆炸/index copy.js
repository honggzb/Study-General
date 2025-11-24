const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// 设置宽高

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义小球

class Ball{
    constructor(x,y,dirx,diry,color){
        // 起始位置
        this.x = x;
        this.y = y;
        // 爆炸方向
        this.dirx = dirx;
        this.diry = diry;
        // 大小
        this.radius = 3;
        // 透明度量
        this.opcity = 4;
        // 颜色
        this.color = color;
    }
    // 绘画函数
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath()
    }
    // 更新
    update(){
        this.dirx *= 0.99;
        this.diry *= 0.99;
        this.diry += 0.1;
        this.x += this.dirx;
        this.y += this.diry;
        this.opcity -= 0.01;
        this.draw()
    }
}

// 小球容器

const balls = [];
// 动画
function animate(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i = 0;i<balls.length;i++){
        balls[i].update();
        // 透明量小于0.1就删除
        if(balls[i].opcity < 0.1){
            balls.splice(i,1)
        }
    }
    // 重复执行动画
    requestAnimationFrame(animate)
}
animate()

// 鼠标点击创建
canvas.addEventListener("click",(e)=>{
    // 一次创建数量
    let nums = 400;
    // 每一个偏移弧度
    let hd = Math.PI * 2 / nums;
    // 循环创建
    for(let i=0;i<nums;i++){
        balls.push(new Ball(
            // 位置
            e.x,
            e.y,
            // 爆炸方向
            Math.cos(hd * i) * (Math.random() * 20),
            Math.sin(hd * i) * (Math.random() * 20),
            // 颜色
            `hsl(${Math.random() * 360},50%,50%)`

        ))
    }
})