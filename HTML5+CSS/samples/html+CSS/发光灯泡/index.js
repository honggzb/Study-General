let bulb = document.querySelector(".bulb");

bulb.onclick = function(){
    if(bulb.getAttribute("class").includes("light")){
        bulb.classList.remove("light")
    }else{
        bulb.classList.add("light")
    }
}