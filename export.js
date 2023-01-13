
const socials = `
        <div class="socials ">
           <!-- Facebook -->
           <a class="btn text-white" style="border:1px solid #3b5998;color: #3b5998;" 
            href="https://www.facebook.com/derrick.golden.31?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" 
            role="button"> <i class="fab fa-facebook-f"></i> </a>
           <!-- Twitter -->
           <a class="btn text-white" style="border:1px solid #55acee;color: #55acee;" 
            href="https://twitter.com/derickgoldenart" target="_blank" rel="noopener noreferrer" role="button">
           <i class="fab fa-twitter"></i> </a>  
           <!-- Instagram -->
           <a class="btn text-white" style="border:1px solid #ac2bac;color: #ac2bac;" 
            href="https://www.instagram.com/derrickgoldenart/" target="_blank" rel="noopener noreferrer"
            role="button"> <i class="fab fa-instagram"></i> </a>   
        </div>
        <div class="socials direct-contact">
            <!-- Whatsapp -->
            <span class="mobile">+254714475702</span>
            <a class="btn text-white" style="border:1px solid #25d366;color: #25d366;" 
            href="https://wa.me/message/USXEEPLFS2DBL1" target="_blank" rel="noopener noreferrer"
             role="button"> <i class="fab fa-whatsapp"></i> </a>
            </a>
        </div>
        `
const contactMe =`
        <i class="fa-solid fa-xmark cancel-pop"></i>
            <p>Get directly in touch with Golden Derrick for any inquiry...</p>
            <!-- phone call -->
            <div class="direct direct-contact">
                <a href="tel:+254714475702">Call
                    <i class="fa-solid fa-mobile-screen" style="color: hsl(205, 77%, 27%);"></i></a>
                </div>
                <!-- message Whatsapp -->
            <div class="direct whatsapp-link">
                <a href="https://wa.me/message/USXEEPLFS2DBL1" target="_blank"
                    rel="noopener noreferrer">Whatsapp 
                    <i class="fab fa-whatsapp" style="color: hsl(125, 67%, 44%);"></i></a>
            </div>
            <div class="direct copy-no copied">
                <span id="copied">Copied to clipboard</span>
                <p>+254714475702 <i class="fa-regular fa-copy" style="color: hsl(205, 77%, 27%);"></i></p> 
            </div>
`

document.body.querySelector(".footer-socials").innerHTML = socials;

let contactPop = document.body.querySelector(".contact-pop");
contactPop.innerHTML=contactMe;

// toggle menu
let nav = document.body.querySelector("nav");
const menu = document.body.querySelector('.fa-bars');
// export default 
function toggleMainNav(){
    const cancel = document.body.querySelector(".fa-xmark")
    menu.addEventListener("click",()=>{
        nav.classList.toggle("toggle")
        menu.setAttribute("style","font-size:0; padding:0;")
    })
    cancel.addEventListener("click",()=>{
        nav.classList.toggle("toggle")
        menu.removeAttribute("style")
    })
}
toggleMainNav();

// choosing gallery
const gallery = document.body.querySelector(".inner-gallery")
const display = document.body.querySelector("#display")
gallery.addEventListener("mouseover",(e)=>{
    display.setAttribute("style","display:inline")
})
gallery.addEventListener("mouseout",()=>{
    display.setAttribute("style","display:none")
})
gallery.addEventListener("click",(e)=>{
    if(document.body.querySelector(".gallery-section")) e.preventDefault()
    console.log(e.currentTarget)
})
document.body.querySelector("#col").addEventListener("click",(e)=>{
    sessionStorage.setItem("colImg",JSON.stringify(true))
})

// direct contact through whatsapp or call
let contact = document.body.querySelector(".contact")
contact.addEventListener("click", directContact)
//cancel pop
document.body.querySelector(".cancel-pop").addEventListener("click",()=>{
    contactPop.classList.add("toggle-pop")
    if(commSection) commSection.classList.remove("blur")
})
//copy contact
document.body.querySelector('.copy-no').addEventListener('click',(e)=>{
    navigator.clipboard.writeText("+254714475702")
    const target = e.currentTarget
    target.classList.remove('copied')
    setTimeout((e)=>{
        target.classList.add('copied')},2000)
})

// positioning nav
let titleHeight = document.body.querySelector(".title").offsetHeight
let header = document.body.querySelector(".head")
nav.setAttribute("style",`top:${titleHeight}px`)

// direct contact function 
const commSection = document.body.querySelector(".outer-body")
function directContact(){
    contactPop.classList.remove("toggle-pop")
    if(header) contactPop.setAttribute("style",`top:${header.offsetHeight + 20}px`)
    nav.classList.add("toggle")
    menu.removeAttribute("style")
    if(commSection) commSection.classList.add("blur")
}

// get storage items
function getStorageOrders(){
    let allOrders;
    let cart_d = JSON.parse(sessionStorage.getItem("cart"));
    let revCart = JSON.parse(sessionStorage.getItem("revCart"));
    try{
        allOrders =JSON.parse(localStorage.getItem("newdom"));
    }catch(e){allOrders = []}
    if(!allOrders) allOrders = [];
    return {allOrders, cart_d, revCart};
}

// retriving the cart
window.addEventListener("load", ()=>{
    let {allOrders} = getStorageOrders();
    document.body.querySelector("#cart-no").innerHTML = allOrders.length
    const dCart = document.body.querySelector(".lst-cart")
    if(dCart){
        dCart.addEventListener("click",(e)=>{
            sessionStorage.setItem("cart",JSON.stringify(true));        
        })
    }
})