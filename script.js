const burgerMenu = document.getElementById('burger-menu');
const burgerMenuIcon = document.getElementById('burger-menu-icon');
const upArrow = document.getElementById("up-arrow");
const downArrow = document.getElementById("down-arrow");
const mainBrown = "#FCF4DA";
const mainGray = "#323131";
const contentBoxes = document.getElementsByClassName("content-box");
const contentBoxesPositions = Array.from(contentBoxes).map( box => box.getBoundingClientRect());
const progressBars = document.getElementsByClassName("progress-bar");

const pages={
    page: 1,
    actualHeight: 0,
    pageHeight: 1.1 * window.innerHeight,
    
};


// if(contentBoxesPositions[0].y != 0){
//     console.table(contentBoxesPositions);
//     console.log(`Y: ${contentBoxesPositions[0].y}`);
//     let offset = contentBoxesPositions[0].y;
//         //posunutie o offset
//     contentBoxesPositions.forEach(box => box.y = box.y - offset);
//         //uprava cisla stranky v objekte pages
//     contentBoxesPositions.forEach((box, index) => {
//         if(box.y == -offset){
//             pages.page = index + 1;
//             console.log(pages.page);
//         }
//     });

//     // console.table(contentBoxesPositions);
//     console.log(offset);
// }

function IsInViewport(element, offset){
    const rect = element.getBoundingClientRect();
    return ((window.innerHeight || document.documentElement.clientHeight) - offset - rect.top > 0 && rect.bottom - offset > 0); 
}

function UpArrowClick(){
    if (pages.page != 1){
        pages.page--;
        contentBoxes[pages.page - 1].scrollIntoView();
        
        if(pages.page % 2 >= 1){
            upArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
            downArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
            Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainBrown);
        }else{
            upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainGray);
            
        }
        
    }
}

function DownArrowClick(){
    if (pages.page != 6){
        pages.page++;
        contentBoxes[pages.page - 1].scrollIntoView();
        
        if(pages.page % 2 >= 1){
            upArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
            downArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
            Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainBrown);
        }else{
            upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainGray);
        }
    }
}



function BurgerClick(){

    burgerMenuIcon.classList.toggle("triggeredIcon");
    burgerMenu.classList.toggle("triggered");
}



document.addEventListener("scroll", (e) =>{

    let offset = (window.innerWidth > 1024 ? contentBoxesPositions[2].height * 0.3 : contentBoxes[2].getElementsByClassName('left-box')[0].getBoundingClientRect().height * 0.2 + contentBoxes[2].getElementsByClassName('right-box')[0].getBoundingClientRect().height);


    if(IsInViewport(contentBoxes[2], offset)){
        Array.from(progressBars).forEach(bar => bar.getElementsByTagName('div')[0].classList.add('bar-visible'));
    }
    else{
        Array.from(progressBars).forEach(bar => bar.getElementsByTagName('div')[0].classList.remove('bar-visible'));
    }




    // if(window.scrollY % window.innerHeight > 0.5*window.innerHeight){
        
    //     console.log(upArrow.getBoundingClientRect());
        // if((window.scrollY / window.innerHeight) % 1 < 0.50){
        //     upArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
        //     downArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
        //     console.log("BROWN");
        // }else{
        //     upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
        //     downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
        //     console.log("GRAY");

        // }
    //     console.log((window.scrollY / window.innerHeight) % 1);
    // }
});


console.log(contentBoxesPositions);
