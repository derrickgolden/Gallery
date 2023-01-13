
// const import { sendmail } from "./public/js/mail.js";

// handling the size and cost
const size = {'g-A4':3000, 'g-A3':4500, 'g-A2':7500, 'c-A3':6000, 'c-A2':9000};
const artType ={c: "COLORED PAINTING",g: "BLACK AND WHITE PAINTING"}

let form = document.body.querySelector(".number");
var type;
let aSize = ""
let price = 0;
document.body.querySelectorAll("p").forEach((element)=>{
    element.addEventListener("click",e =>{
        let id = e.currentTarget.id;
        type = artType[id.slice(0,1)]
        aSize = id.slice(2)
        if(price = size[id])
        form.classList.remove("num")
        form.querySelector("input").focus();
        commSection.classList.add("blur")
    })
})

// direct contact function 
    /* filter: blur(2px); */
document.body.querySelector(".drk").addEventListener("click",directContact)
function directContact(){
    contactPop.classList.remove("toggle-pop")
    contactPop.setAttribute("style",`top:${header.offsetHeight +20}px`)
    nav.classList.add("toggle")
    menu.removeAttribute("style")
    commSection.classList.add("blur")
}

// create dom function
function elt(element, attr, ...children){
    let dom = document.createElement(element)
    if(attr){
        for(let keys of Object.keys(attr)){
            dom.setAttribute(keys,attr[keys])
        }
    }
    for(let child of children){
        if(typeof child == "string"){
            dom.appendChild(document.createTextNode(child))
        }else dom.appendChild(child)
    }
    return dom
}

let total = 0;
let no = 0;
function createDom({id,info}){
    let {size,type_art,people,price} = info;
    total += price;
    document.body.querySelector("#subtotal").innerHTML = total;
    no++;
    document.body.querySelector("#cart-no").innerHTML = no;
    return elt("table",{class: "table", id: id},
        elt("tr",null,elt("th",{class: "t-head"},type_art),elt("td",{class: "t-head",style:"text-align: right;"},
        elt("i",{class: "fa-solid fa-trash t-head", id:"remove"}))),
        elt("tr",null,elt("td",null,"Size"),elt("td",null,size)),
        elt("tr",null,elt("td",null,"Person(s)"),elt("td",null,people)),
        elt("tr",null,elt("td",null,"Quantity"),elt("td",null,"1")),
        elt("tr",null,elt("th",null,"Subtotal"),elt("th",null,String(price))))
}

// number of persons
let orderInfo = []
let cart = document.body.querySelector(".inner-cart")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let persons = document.body.querySelector("input").value
    let value = Number(persons);
    if(value && value > 0){
        let subTotal = price + ((value-1)*500);
        form.classList.add("num")
        commSection.classList.remove("blur")

        const id = new Date().getTime().toString();
        let info ={size: aSize, type_art:type, people: persons, price: subTotal}
        let details = {id, info}
        orderInfo.push(details)
        
        let dom = createDom(details);
        localStorage.setItem("newdom",JSON.stringify(orderInfo));
        notification(`<p>Added to Cart</p>`,"rgb(180, 216, 180)");
        dom.querySelector("#remove").addEventListener("click", removeFromCart)
        cart.appendChild(dom);
    }
})

// check out listener
let clientCont = document.body.querySelector(".cart-container");
let checkOut = document.body.querySelector(".checkout")
let clientInfor = document.body.querySelector(".client-infor")
checkOut.addEventListener("submit",(e)=>{
    e.preventDefault();
    window.scrollTo(0,0);
    clientCont.removeAttribute("style")
    clientInfor.removeAttribute("style")
    commSection.classList.add("blur")
})

const clientDetails = document.body.querySelector('.client_details')
checkOut.querySelector(".shop").addEventListener("click", ()=>{
    clientCont.removeAttribute("style")
    commSection.classList.remove("blur")
})
//display notification function
function notification(text,color){
    let notif = document.body.querySelector(".notifications")
    notif.innerHTML= text;
    notif.setAttribute("style",`background-color:${color}`)
    notif.classList.remove("note")
    setTimeout(()=>{
        notif.classList.add("note")
    },3000)
}

// client infor
clientInfor.querySelector(".fa-xmark").addEventListener("click", ()=>{
    clientInfor.setAttribute("style","right:120%")
    commSection.classList.remove("blur")
    clientDetails.querySelector('button').innerHTML = 'Submit'
    clientDetails.querySelector('.loader').classList.add("load")
})

// using socket to send emails
const socket = io()
socket.on('connect',()=>{
    console.log("client connect...")
    clientDetails.addEventListener("submit",(e)=>{
        e.preventDefault();
        clientDetails.querySelector('button').innerHTML = 'Submitting...'
        clientDetails.querySelector('.loader').classList.remove("load")
        const name = clientDetails.querySelector('#name').value
        const no = clientDetails.querySelector('#no').value
        socket.emit('order',{name,no,orderInfo})
    })
})
socket.on('success',(response)=>{
    console.log(response)
    localStorage.removeItem("newdom")
    notification('Order Placed. Thank You.',"rgb(180, 216, 180)")
    clientInfor.setAttribute("style","right:120%")
    setTimeout(()=>{
        commSection.classList.remove("blur");
        location.reload();
    },3000)
})
socket.on('error',(error)=>{
     clientInfor.setAttribute("style","right:120%")
     clientDetails.querySelector('button').innerHTML = 'Submit'
    clientDetails.querySelector('.loader').classList.add("load")
    contactPop.querySelector('p').innerHTML = 'We apologize, your order has not been fullfilled. Kindly contact us directly to complete your order'
    directContact()
    commSection.classList.add("blur")
    console.log(error)
 })

// listening for cart
document.body.querySelector(".lst-crt").addEventListener("click", displayCart)

// display cart
function displayCart(){
    if(orderInfo.length == 0){
        let emptyCart = document.body.querySelector(".emp-cart")
        emptyCart.classList.remove("display-cart")  
     }else{
         window.scrollTo(0,0)
         clientCont.setAttribute("style","transform:translateX(120%)")   
     }
     commSection.classList.add("blur")
}

// delete an order and reload
function removeFromCart(e){
    let tbl = e.currentTarget.parentElement.parentElement.parentElement;
    let {allOrders} = getStorageOrders();
    allOrders = allOrders.filter(order => order.id !== tbl.id)
    localStorage.setItem("newdom",JSON.stringify(allOrders));
    sessionStorage.setItem("revCart",JSON.stringify(true));
    location.reload()
}

// retriving the cart
window.addEventListener("load", ()=>{
    let {allOrders, cart_d, revCart} = getStorageOrders();

    allOrders.forEach((info)=>{
        let dom = createDom(info);
        dom.querySelector("#remove").addEventListener("click", removeFromCart)
        cart.appendChild(dom);
    })
    orderInfo = allOrders;

    if(cart_d){
        sessionStorage.removeItem("cart");
        displayCart()
    }
    if(revCart){
        sessionStorage.removeItem("revCart");
        notification(`<p>One item removed! </p>`,"rgb(201, 201, 140)");
        displayCart()
    }
    
    if(JSON.parse(sessionStorage.getItem("contact"))){
        sessionStorage.clear();
        directContact()
    }
})


