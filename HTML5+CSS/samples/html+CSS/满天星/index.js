for(let i = 0;i< 100;i++){
    let el = document.createElement("span");
    el.style = `--i:${Math.random() * 50 + 1}`;
    balls.append(el)
}