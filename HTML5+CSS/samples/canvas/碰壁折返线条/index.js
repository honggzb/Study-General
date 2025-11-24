const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

let bgcolor = 0;
class ball{
    x=null
    y=null
    width=3
    dirX=Math.random() * 3 - 1.5
    dirY=Math.random() * 3 - 1.5
    color=`hsl(${bgcolor},100%,50%)`
    constructor(x,y){
      this.x = x;
      this.y = y;
    }
  
    update() {
        this.color = `hsl(${bgcolor},100%,50%)`
       this.x += this.dirX;
       this.y += this.dirY;
     
       if(this.x > canvas.width - this.width || this.x <this.width){
        this.dirX = -this.dirX
       }
       if(this.y > canvas.height - this.width || this.y <this.width){
        this.dirY = -this.dirY
       }
    }
    draw(){
      ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.width,0,Math.PI * 2);
        ctx.fill()
    }
}

const ballArr = [];


function animate(x,y){
    ballArr.forEach((item,index) =>{
        item.draw()
        item.update();
        bgcolor += 0.5;
        if(  bgcolor >360){
            bgcolor = 0
        }
    })
    requestAnimationFrame(animate)
}
animate()

function makeBall(x,y){
    for(let i=0;i<1;i++){
        let balls = new ball(x,y);
      
     ballArr.push(balls)
    }
}


canvas.addEventListener("click",(e) =>{
    makeBall(e.x,e.y)
})
