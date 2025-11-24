const can = document.getElementById("canvas");

can.width = window.innerWidth;
can.height = window.innerHeight;

const ctx = can.getContext("2d");

const m = {
    x:can.width / 2,
    y:can.height / 2
}
const arry = []

function init(){
    for(let i = 0;i<40;i++){
        arry.push(new item(can.width,can.height))
    }
}
init()
function item(x,y){
    // 位置
    this.x = x;
    this.y = y;

    this.angle = Math.PI * 2 * Math.random();
    this.radius = Math.random() * 180;
    this.color = `hsl(${Math.random() * 360},50%,50%)`
    // 绘画
    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x,this.y);
        this.angle += 0.08
        this.x = m.x + Math.cos(this.angle) * this.radius;
        this.y = m.y + Math.sin(this.angle) * this.radius;
        ctx.lineTo(this.x,this.y);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath()
    }
}
// let items = new item(200,200);
// items.draw()

function animate(){
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0,0,can.width,can.height)
    arry.forEach(item =>{
        item.draw()
    })
}
animate()

window.onmousemove = function(e){
    m.x = e.clientX;
    m.y = e.clientY
}
