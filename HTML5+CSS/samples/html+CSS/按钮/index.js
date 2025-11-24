let btn = document.querySelector(".btn");

btn.onclick = function(){
    for(let i = 0;i< 360;i++){
        let pop = document.createElement("div");
        pop.className = 'pop';
        pop.style =  `--i:${i}`
        btn.append(pop);
        setTimeout(()=>{
            btn.removeChild(pop)
        },1000)
    }
}
