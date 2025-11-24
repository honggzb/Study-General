
const process = document.querySelector('.process');
const text = document.querySelector('.text');
const add = document.querySelector('.add');
const sub = document.querySelector('.sub')

function rotateCircle(num){
    // 获取圆形的总长度
    var circleLength = Math.floor(2 * Math.PI * parseFloat(process.getAttribute('r')))
    var value = num * circleLength / 100
    // 设置实线长度
    process.setAttribute('stroke-dasharray',value+",10000")
    // 改变中间文字
    text.innerHTML = num + "%"
}


let num = 0
add.addEventListener('click',()=>{
    num ++;
    rotateCircle(num)
})

sub.addEventListener('click',()=>{
    num --
    rotateCircle(num)
})
