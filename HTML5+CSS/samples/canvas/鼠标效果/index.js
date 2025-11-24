//拿到canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// 设置画布宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// 颜色
var color = 0;

// 定义小刺类
class Ball{
    constructor(){
        // 位置
        this.x = mouse.x;
        this.y = mouse.y;
        // 行进方向
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        // 颜色
        this.color = `hsl(${color},100%,50%)`;
        // 大小
        this.size = Math.random() * 8 + 1;
    }
    draw(){
        // 绘画小刺
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
    // 更新小刺
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.3) this.size -= 0.1;
    }
}
// 小刺容器
var Balls = [];

// 处理小刺
function handleBall(){
    for(let i=0;i<Balls.length;i++){
        Balls[i].update();
        Balls[i].draw();
        // 删除多余小球'
        if(Balls[i].size<0.3){
            Balls.splice(i,1)
        }
    }
}

// 动画
function animation(){
    // 设置上一次画布颜色
    ctx.fillStyle = "rgba(0,0,0,0.02)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleBall();
    // 设置颜色
    color += 5
}

setInterval(()=>{
    animation()
},10)

// 鼠标移动创建小刺
const mouse = {
    x:0,
    y:0
}
canvas.addEventListener("mousemove",(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    // 每次创建20个
    for(let i=0;i<20;i++){
        Balls.push(new Ball())
    }
})