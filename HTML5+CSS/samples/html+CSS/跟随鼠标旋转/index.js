document.addEventListener("mousemove",(e)=>{
    // 鼠标位置
    let mouseX = e.x;
    let mouseY = e.y;
    // 所有item
    let items = document.querySelectorAll(".item");
    items.forEach(item =>{
        // 距离左边和顶部的距离
       let offsetX = item.offsetLeft;
       let offsetY = item.offsetTop;
       console.log(offsetX,offsetY)
       
      //计算以item为原点鼠标在x,y轴上的位置
      let diffX = mouseX - offsetX;
      let diffY = mouseY - offsetY;
    //   求出item旋转角度
    //1° = Math.pI /180

    let hudu = Math.atan2(diffY,diffX);
    let angle = hudu / (Math.PI / 180);
    // 设置item旋转
    item.style.transform = `rotate(${angle}deg)`
    })
})