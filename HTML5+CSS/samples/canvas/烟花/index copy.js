const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Ball {
  constructor(y) {
    this.y = y;
    this.x = canvas.width / 2;
    this.color = `hsl(${Math.random() * 360},50%,50%)`
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
    ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.closePath();
  }
  update() {
    this.y -= 4;
    if (this.y < 300) {
      this.color = `hsl(${Math.random() * 360},50%,50%)`
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animate(this.x, this.y, this.color)
      this.y = canvas.height;
    }

    this.draw()
  }
}

let ball = new Ball(canvas.height)
setInterval(() => {
  ball.update();
  dots.forEach((item, index) => {
    item.update();
    if (item.size < 0.1) {
      dots.splice(index, 1)
    }
  })
}, 10)


class Dot {
  constructor(x, y, dirx, diry, color) {
    this.x = x;
    this.y = y;
    this.dirx = dirx;
    this.diry = diry;
    this.color = color;
    this.size = 5
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    console.log(this.color)
    ctx.closePath();

  }
  update() {
    this.size -= 0.1
    this.diry += 0.3
    this.y += this.diry;
    this.x += this.dirx;
    this.draw();

  }
}
var dots = []
function animate(x, y, color) {
  let num = 300;
  let hd = Math.PI * 2 / num
  for (let i = 0; i < num; i++) {
    dots.push(new Dot(
      x,
      y,
      Math.cos(hd * i) * Math.random() * 12,
      Math.sin(hd * i) * Math.random() * 12,
      color
    ))

  }
}

