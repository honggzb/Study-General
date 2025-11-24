

let content = document.querySelector(".content");

for(let i = 0;i<50;i++){
    let newItem = document.createElement("div");
    newItem.className = "item";
newItem.style.setProperty("--i",((i+1) * 0.1)+ 's')
    content.append(newItem)
}