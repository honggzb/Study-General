let textbox = document.querySelector(".text-box");
let texts = textbox.textContent;
let index = 0;
let startHeart = document.querySelector(".start-heart")
let audio = document.querySelector(".audio")
// 初始化
function init() {
    textbox.textContent = ""
    index = 0;
}

//点击开始
function start(){
    textbox.style.display = "block";
    setValue();
    startHeart.style.display = "none";
    createHeart();
    audio.play()
}
startHeart.onclick = start;
// 设置文字逐个出现
function setValue() {
    if (index < texts.length) {
        textbox.textContent = texts.slice(0, index) + (index < texts.length - 1 ? "|" : "");
        setTimeout(() => {
            setValue()
        }, 100)
    }
    index++;
    if(index >= texts.length){
        init()
    }
}
// setValue()

// 创建爱心
function createHeart() {
    let heartbox = document.querySelector(".heart-box");
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        div.className = "heart";
        div.style = `--i:${Math.random() * 20 + 10}`
        heartbox.append(div)
    }
}
// createHeart()