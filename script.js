const burgerMenu = document.getElementById('burger-menu');
const burgerMenuIcon = document.getElementById('burger-menu-icon');
const upArrow = document.getElementById("up-arrow");
const downArrow = document.getElementById("down-arrow");
const mainBrown = "#FCF4DA";
const mainGray = "#323131";
const contentBoxes = document.getElementsByClassName("content-box");
const contentBoxesPositions = Array.from(contentBoxes).map( box => box.getBoundingClientRect());
const progressBars = document.getElementsByClassName("progress-bar");
let portfolio = [1,2,3, 4];
const portfolioProjects = document.getElementsByClassName("portfolio-project");

const pages={
    page: 1,
    actualHeight: 0,
    pageHeight: 1.1 * window.innerHeight,
    
};



// function disableScroll() {
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

//         // if any scroll is attempted,
//         // set this to the previous value
//         window.onscroll = function() {
//             window.scrollTo(scrollLeft, scrollTop);
//         };
// }

// // disableScroll();

// window.onscroll = function() {
//     pages.page++;
//     window.scrollTo(contentBoxes[pages.page - 1].getBoundingClientRect().y, contentBoxes[pages.page - 1].getBoundingClientRect().top);
//     // contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"});
// };

/*
*   Zmena farby sipok a burger menu ikony pri presune na podstranky
*
*
*/
function ArrowBurgerColorChange(pageNumber){
    if(pageNumber % 2 >= 1){
        upArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
        downArrow.getElementsByTagName('path')[0].style.fill = mainBrown;
        Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainBrown);
    }else{
        upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
        downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
        Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainGray);
    }
    
    

    if(window.innerWidth <= 1024){
        if(pageNumber == 1){
            upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainGray);
        }
        else{
            upArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            downArrow.getElementsByTagName('path')[0].style.fill = mainGray;
            Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainBrown);
        }
    }
}



/*
*   Funkcia, ktora zisti ci je element vo viewPorte uzivatela
*
*
*/

function IsInViewport(element, offset){
    const rect = element.getBoundingClientRect();
    return ((window.innerHeight || document.documentElement.clientHeight) - offset - rect.top > 0 && rect.bottom - offset > 0); 
}



function PortfolioSliderRendering(direction){
    if(direction == "up"){
        Array.from(portfolioProjects).forEach(item => item.classList.remove( 'first-project', 'second-project', 'hidden-project', 'last-hidden-project'));
        
        portfolioProjects[portfolio[0] - 1].classList.add("first-project");
        portfolioProjects[portfolio[1] - 1].classList.add("second-project");
        portfolioProjects[portfolio[2] - 1].classList.add("hidden-project");
        portfolioProjects[portfolio[3] - 1].classList.add("last-hidden-project");
    }
    else if(direction == "down"){
        Array.from(portfolioProjects).forEach(item => item.classList.remove( 'first-project', 'second-project', 'hidden-project', 'last-hidden-project'));

        portfolioProjects[portfolio[0] - 1].classList.add("first-project");
        portfolioProjects[portfolio[1] - 1].classList.add("second-project");
        portfolioProjects[portfolio[2] - 1].classList.add("last-hidden-project");
        portfolioProjects[portfolio[3] - 1].classList.add("hidden-project");
    }

    if(portfolio[0] > portfolio[1]){
        document.getElementById('projects').style.flexDirection = "column-reverse";
    }
    else{
        document.getElementById('projects').style.flexDirection = "column";

    }
}


function PortfolioUpArrow(){
    portfolio = portfolio.map(item =>{ 
        item++;
        if(item == 5){
            item = 1;
        } 
        return item;
    });
    
    PortfolioSliderRendering("up");
    
    Array.from(document.getElementsByClassName("hidden-project")).forEach(item => {
        item.style.top = "0px";
        item.style.animation = "hidden-project-animation 0.1s";
    });

    document.getElementsByClassName("last-hidden-project")[0].style.animation = "last-hidden-project-animation-up 2s";
    document.getElementsByClassName("last-hidden-project")[0].style.top = "0px";
    
    document.getElementsByClassName("first-project")[0].style.animation = "first-project-animation-up 2s"
    document.getElementsByClassName("second-project")[0].style.animation = "second-project-animation-up 2s"


    console.log(portfolio);
}


function PortfolioDownArrow(){
    portfolio = portfolio.map(item =>{ 
        item--;
        if(item == 0){
            item = 4;
        } 
        return item;
    });
    
    PortfolioSliderRendering("down");
    
    Array.from(document.getElementsByClassName("hidden-project")).forEach(item => {
        item.style.bottom = "0px";
        item.style.animation = "hidden-project-animation 0.1s";
    });
    
    document.getElementsByClassName("last-hidden-project")[0].style.animation = "last-hidden-project-animation-down 2s";
    document.getElementsByClassName("last-hidden-project")[0].style.bottom = "0px";
    
    document.getElementsByClassName("first-project")[0].style.animation = "first-project-animation-down 2s"
    document.getElementsByClassName("second-project")[0].style.animation = "second-project-animation-down 2s"
    

    console.log(portfolio);
}

/*
*   Reakcie na stlacenie sipky hore, posunutie a presmerovanie na dalsie podstranku
*
*
*/
function UpArrowClick(){
    if (pages.page != 1){
        pages.page--;

        contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"});

        ArrowBurgerColorChange(pages.page);
    }
}

/*
*   Reakcie na stlacenie sipky dolu, posunutie a presmerovanie na dalsie podstranku
*
*
*/
function DownArrowClick(){
    if (pages.page != 6){
        pages.page++;
        
        contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"});

        ArrowBurgerColorChange(pages.page);
    }
}

/*
*   Spracovanie akcie kliknutia v burger menu, nastavenie premennej pages.page
*
*/

function BurgerClick(index){
    if(index != -1){
        pages.page = index;
        
        ArrowBurgerColorChange(pages.page);
    }

    burgerMenuIcon.classList.toggle("triggeredIcon");
    burgerMenu.classList.toggle("triggered");
}


function ScrollEventFunction(){
    
            //Animation of progressBars activated on scroll
        let offset = (window.innerWidth > 1024 ? contentBoxesPositions[2].height * 0.3 : contentBoxes[2].getElementsByClassName('left-box')[0].getBoundingClientRect().height * 0.2 + contentBoxes[2].getElementsByClassName('right-box')[0].getBoundingClientRect().height);
    
        if(IsInViewport(contentBoxes[2], offset)){
            Array.from(progressBars).forEach(bar => bar.getElementsByTagName('div')[0].classList.add('bar-visible'));
        }
        else{
            Array.from(progressBars).forEach(bar => bar.getElementsByTagName('div')[0].classList.remove('bar-visible'));
        }
    
            //Changing color of burger menu when window.innerWidrh <= 1024
        if(window.innerWidth <= 1024){
            if(!IsInViewport(contentBoxes[pages.page - 1].getElementsByClassName('right-box')[0], 0) && pages.page != 1){
                Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainGray);
                
            }
            else if(IsInViewport(contentBoxes[pages.page - 1].getElementsByClassName('right-box')[0], 0)){
                Array.from(burgerMenuIcon.getElementsByTagName('div')).forEach(element => element.style.backgroundColor = mainBrown);
    
            }
    }
}
    



function WheelEventFunction(){

    // if(pages.page != 6 && IsInViewport(contentBoxes[pages.page], 0)){
    //     pages.page++;

    //     document.removeEventListener("wheel", WheelEventFunction);
    //     setTimeout(()=>contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"}), 1000);
    //     //contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"});
    //     setTimeout(() => document.addEventListener("wheel", WheelEventFunction), 1000);
    //     // contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"});
    //     console.log("DownArrowCalled, page: ", pages.page);
    // }
    // else if(pages.page != 1 && IsInViewport(contentBoxes[pages.page - 2], 0)){
    //     pages.page--;
    //     document.removeEventListener("wheel", WheelEventFunction);
    //     setTimeout(()=>contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"}), 1000);
    //     //contentBoxes[pages.page - 1].scrollIntoView({behavior: "smooth"});
    //     setTimeout(() => document.addEventListener("wheel", WheelEventFunction), 1000);
    //     console.log("UpArrowCalled, page: ", pages.page);
    // }


}

/*
*   Event listener na scroll
*   Akcie, ktore sa vykonavaju na scroll
*
*
*/
document.addEventListener("scroll", ScrollEventFunction);

document.addEventListener("wheel", WheelEventFunction);


/*
*   Spracovanie anchru v URL pri nacitani stranky
*
*
*/
window.onload = (event) =>{
    let URL = document.URL;
    if(URL.indexOf("/#") != -1){
        let anchor = URL.slice(URL.indexOf("/#") + 1);
        
            if( anchor == "#about-me"){
                pages.page = 1;
            }
            else if(anchor == "#front-end-road-map"){
                pages.page = 2;
            }
            else if(anchor == "#other-skills"){
                pages.page = 3;
            }
            else if(anchor == "#portfolio"){
                pages.page = 4;
            }
            else if(anchor == "#career"){
                pages.page = 5;
            }
            else if(anchor == "#contact"){
                pages.page = 6;
            }
            else{
                pages.page = 1;
            }
    }

    ArrowBurgerColorChange(pages.page);
}
