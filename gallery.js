
// import { } from "./export.js"

let grayDom =`
<H3 class="art-type">BLACK AND WHITE DRAWING(GRAY)</H3>
<div class="gallery-images">
    <div><img src="./drawings/gray/sm_betty_complete.JPG" alt="BLACK AND WHITE DRAWING"></div>
    <div><img src="./drawings/gray/sm_twin_kid_complete.JPG" alt="BLACK AND WHITE DRAWING"></div>
    <div><img src="./drawings/gray//sm_law_kid_comp.jpg" alt="BLACK AND WHITE DRAWING"></div>
    <div><img src="./drawings/gray/sm_cynthia_comp.jpg" alt="BLACK AND WHITE DRAWING"></div>
    <div><img src="./drawings/gray/sm_daisy_comp.jpg" alt="BLACK AND WHITE DRAWING"></div>
    <div><img src="./drawings/gray/sm_winnie_comp.jpg" alt="BLACK AND WHITE DRAWING"></div>
</div>
<H3 class="art-type">BLACK AND WHITE PAINTING(GRAY)</H3>
<div class="gallery-images">
    <div><img src="./drawings/gray/sm_dad_son_paint_complete.jpg" alt="BLACK AND WHITE PAINTING"></div>
    <div><img src="./drawings/gray/sm_couple_paint_comp.jpg" alt="BLACK AND WHITE PAINTING"></div>
    <div><img src="./drawings/gray/sm_sun_face_paint_comp.jpg" alt="BLACK AND WHITE PAINTING"></div>
    <div><img src="./drawings/gray/sm_qatar_paint_comp.jpg" alt="BLACK AND WHITE PAINTING"></div>
    <div class="Lscape1 Lscape"><img class="landscape" src="./drawings/gray/sm_nigeria_family_paint_comp.jpg" alt="BLACK AND WHITE PAINTING"></div>
    <div class="Lscape2 Lscape"><img class="landscape" src="./drawings/gray/sm_SA_family_paint_comp.jpg" alt="BLACK AND WHITE PAINTING"></div>
</div>
`

let colDom =`
<H3 class="art-type">COLORED PAINTINGS</H3>
<div class="gallery-images">
    <div><img src="./drawings/colored/sm_couple_col_comp.jpg" alt="COLORED PAINTING"></div>
    <div><img src="./drawings/colored/sm_prision_col_comp.jpg" alt="COLORED PAINTING"></div>
    <div><img src="./drawings/colored/sm_lady_col_inc.jpg" alt="COLORED PAINTING"></div>
    <div><img src="./drawings/colored/sm_leop_monkey_col.jpg" alt="COLORED PAINTING"></div>
    <div><img src="./drawings/colored/sm_cheetah_col.jpg" alt="COLORED PAINTING"></div>
    <div><img src="./drawings/colored/sm_shark_lady_col.jpg" alt="COLORED PAINTING"></div>
    <div class="Lscape3 Lscape"><img class="landscape" src="./drawings/colored/sm_lady1_col.jpg" alt="COLORED PAINTING"></div>
    <div class="Lscape4 Lscape"><img class="landscape" src="./drawings/colored/sm_mzungu_family_col.jpg" alt="COLORED PAINTING"></div>
    <div class="Lscape5 Lscape"><img class="landscape" src="./drawings/colored/sm_kinoti_wall_col.jpg" alt="COLORED PAINTING"></div>
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

