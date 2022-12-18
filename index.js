let contact = document.body.querySelector(".contact")
contact.addEventListener("click", ()=>{
    sessionStorage.setItem("contact",JSON.stringify(true))
})