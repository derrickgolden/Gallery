
// import { } from "./export.js"

let grayDom =`
<H3 class="art-type">BLACK AND WHITE DRAWING(GRAY)</H3>
<div class="gallery-images">
    <img src="./drawings/gray/betty_complete.JPG" alt="BLACK AND WHITE DRAWING">
    <img src="./drawings/gray/DSCN0125.JPG" alt="BLACK AND WHITE DRAWING">
    <img src="./drawings/gray/IMG_20210312_145251.jpg" alt="BLACK AND WHITE DRAWING">
    <img src="./drawings/gray/IMG_20210709_152052.jpg" alt="BLACK AND WHITE DRAWING">
    <img src="./drawings/gray/IMG_20210630_101035.jpg" alt="BLACK AND WHITE DRAWING">
    <img src="./drawings/gray/IMG_20211220_164853 (1).jpg" alt="BLACK AND WHITE DRAWING">
</div>
<H3 class="art-type">BLACK AND WHITE PAINTING(GRAY)</H3>
<div class="gallery-images">
    <img src="./drawings/gray/IMG_20200922_064156.jpg" alt="BLACK AND WHITE  PAINTING">
    <img src="./drawings/gray/IMG_20210325_080604.jpg" alt="BLACK AND WHITE  PAINTING">
    <img src="./drawings/gray/IMG_20210102_110916.jpg" alt="BLACK AND WHITE  PAINTING">
    <img src="./drawings/gray/IMG_20210603_105513.jpg" alt="BLACK AND WHITE  PAINTING">
    <img class="landscape" src="./drawings/gray/IMG_20201202_083037.jpg" alt="BLACK AND WHITE  PAINTING">
    <img class="landscape" src="./drawings/gray/IMG_20220903_110116 (1).jpg" alt="BLACK AND WHITE  PAINTING">
</div>
`

let colDom =`
<H3 class="art-type">COLORED PAINTINGS</H3>
<div class="gallery-images">
    <img src="./drawings/colored/IMG_20220425_193116.jpg" alt="COLORED PAINTING">
    <img src="./drawings/colored/IMG_20220401_182307.jpg" alt="COLORED PAINTING">
    <img src="./drawings/colored/IMG_20201123_150645.jpg" alt="COLORED PAINTING">
    <img src="./drawings/colored/IMG_20220308_095729.jpg" alt="COLORED PAINTING">
    <img src="./drawings/colored/IMG_20220830_105816.jpg" alt="COLORED PAINTING">
    <img class="landscape" src="./drawings/colored/IMG_20200213_083804.jpg" alt="COLORED PAINTING">
    <img class="landscape" src="./drawings/colored/IMG_20200306_163522.jpg" alt="COLORED PAINTING">
    <img class="landscape" src="./drawings/colored/IMG-20221004-WA0003.jpg" alt="COLORED PAINTING">
</div>
`
let gallery0 = document.body.querySelector(".gallery-img")
document.body.querySelector("#col").addEventListener("click",(e)=>{
    nav.classList.toggle("toggle")
    menu.removeAttribute("style")
    gallery0.innerHTML = colDom;
})
document.body.querySelector("#gray").addEventListener("click",(e)=>{
    nav.classList.toggle("toggle")
    menu.removeAttribute("style")
    gallery0.innerHTML = grayDom;
})

if(JSON.parse(sessionStorage.getItem("colImg"))) {
    gallery0.innerHTML = colDom;
    console.log(JSON.parse(sessionStorage.getItem("colImg")))
    sessionStorage.removeItem("colImg")
} 
else gallery0.innerHTML = grayDom;

