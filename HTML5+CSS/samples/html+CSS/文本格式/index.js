const textarea = document.querySelector("textarea");
const content = document.querySelector(".content")
textarea.addEventListener("input",function(){
    console.log(this.value)
    content.innerHTML = this.value
})