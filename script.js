const burgerMenu = document.getElementById('burger-menu');
const burgerMenuIcon = document.getElementById('burger-menu-icon');
const upArrow = document.getElementById("up-arrow");
const downArrow = document.getElementById("down-arrow");
const mainBrown = "#FCF4DA";
const mainGray = "#323131";
let burgerMenuTriggered = false;
const pages={
    page: 1,
    actualHeight: 0,
    pageHeight: 1.1 * window.innerHeight,

};

function UpArrowClick(){
    if (pages.page != 1){
        pages.page--;
        //TODO scroll na podstranku
    }
    console.log(pages.page)
}

function DownArrowClick(){
    if (pages.page != 6){
        pages.page++;
        //TODO scroll na podstranku
    }
    console.log(pages.page)
}

function IsInViewport(element, offset){
    const rect = element.getBoundingClientRect();
    return ((window.innerHeight || document.documentElement.clientHeight) - offset - rect.top > 0 && rect.bottom - offset > 0); 
}


function BurgerClick(){

    burgerMenuIcon.classList.toggle("triggeredIcon");
    burgerMenu.classList.toggle("triggered");
}

document.addEventListener("scroll", (e) =>{

    if(window.scrollY % window.innerHeight > 0.5*window.innerHeight){

        console.log(upArrow.getBoundingClientRect());
        if((window.scrollY / window.innerHeight) % 1 < 0.50){
            upArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
            downArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
            console.log("BROWN");
        }else{
            upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            console.log("GRAY");

        }
        console.log((window.scrollY / window.innerHeight) % 1);
    }
});