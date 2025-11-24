/*
@幽默的大锤
canvas烟花爆炸特效
*/

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 画一个圆
ctx.fillStyle = "red";


class Ball {
    constructor(x, y, dirx, diry,color) {
        this.x = x;
        this.y = y;
        this.dirx = dirx;
        this.diry = diry;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath()
    }
    update() {
        this.dirx *= 0.99;
        this.diry *= 0.99;
        this.diry += 0.1;
        this.x += this.dirx;
        this.y += this.diry;
        this.draw()
    }
}

var balls = [];
function animate() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update()
    }
}
setInterval(() => {
    animate()
}, 10)
canvas.addEventListener("click", (e) => {
    let num = 400;
    let hd = Math.PI * 2 / num;
    for (let i = 0; i < num; i++) {
        balls.push(new Ball(
            e.x,
            e.y,
            //    方向
            Math.cos(hd * i) * Math.random() * 20,
            Math.sin(hd * i) * Math.random() * 20,
            `hsl(${Math.random() * 360},50%,50%)`
        ))
    }

})

