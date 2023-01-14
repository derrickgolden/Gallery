
let photos = ["./drawings/gray/sm_kuria_comp.jpg"];
let images = document.body.querySelector(".images")
console.log(images)

let index = 0
createDom(photos[0],images,1)
for(let index= 1;index<photos.length; index++){
        createDom(photos[index],images,0)
}

function createDom(photo,images, slide){
    let dom = document.createElement("img");
    dom = Object.assign(dom, {src: photo, alt: "drawings",style: `opacity:${slide}%`})
    images.appendChild(dom)
}
setInterval(()=>{
    if(index == images.children.length) index = 0;
    Array.from(images.children).forEach((element,i)=>{
        if(i == index){
            element.style.opacity = 1;
        }else{
            element.style.opacity = 0;
        }
    })
    index++;
},2000)

// let image = images.children;
// Array.from(image).forEach((element,index) => {
//     let l = 60 * index;
//     element.style.left = `${l}%`
// });

// let l = 0;
// setInterval(()=>{   
//     let images = document.body.querySelector(".images")
//     let image = images.children;
//         Array.from(image).forEach((element,index) => {
//             element.style.transform = ` translateX(-${l*100}%)`
//     });
//     l++;

//     //rotate array;
//     let pic = photos.shift()
//     photos.push(pic)
//     createDom(pic,images, image.length)
// },2000)

// toggle menu.

// import {} from "./export.js"

let img = (document.body.querySelector(".innerImage").offsetHeight)/2
let img1 = (document.body.querySelector("#img").offsetHeight)
img1 += 100
console.log(img1)
document.body.querySelector(".images").setAttribute("style",`height:${img1}px`)