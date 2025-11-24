let textBoxs = document.querySelectorAll(".glowIn");

textBoxs.forEach(item =>{
    let txts = item.textContent.split("");

    item.textContent = "";

    txts.forEach((txt,i)=>{
        let span = document.createElement("span");
        span.textContent = txt;
span.style.animationDelay = `${i * 0.05}s`
        item.append(span)
    })
})
