const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dots = [];
class Bon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = `hsl(${Math.random() * 360},50%,50%)`
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath()
  }
  update() {
    ctx.fillStyle = "rgba(0,0,0,0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.y -= 5;
    if(this.y<300){
      let dotNums = 100;
      let hd = Math.PI * 2 / dotNums;
     

      for(let i = 0;i<dotNums;i++){
        dots.push(new Dot(
          this.x,
          this.y,
          Math.cos(hd * i) * Math.random() * 19,
          Math.sin(hd * i) * Math.random() * 19,
          this.color
        ))
      }
      this.color = `hsl(${Math.random() * 360},50%,50%)`
      this.y = canvas.height;
    }
    this.draw()
  }
}
const bon = new Bon(canvas.width / 2, canvas.height);
// bon.draw()
setInterval(()=>{
  bon.update();
  dots.forEach((item,index)=>{
    item.update();
    if(item.size < 0.1){
      dots.splice(index,1)
    }
  })
},10)

class Dot {
  constructor(x, y,dirx,diry,color) {
    this.x = x;
    this.y = y;
    this.dirx = dirx;
    this.diry = diry;
    this.size = 5;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath()
  }
  update() {
    this.size -= 0.1;
    this.diry += 0.3
    this.x -= this.dirx;
    this.y += this.diry
    this.draw()
  }
}
// let dot = new Dot(400, 400);
// setInterval(()=>{
//   dot.update()
// },10)