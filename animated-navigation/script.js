const menuBars = document.querySelector('#menu-bars');
const overLay = document.querySelector('#overlay');
const nav1 = document.querySelector('#nav-1');
const nav2 = document.querySelector('#nav-2');
const nav3 = document.querySelector('#nav-3');
const nav4 = document.querySelector('#nav-4');
const nav5 = document.querySelector('#nav-5');

const navItems = [nav1, nav2, nav3, nav4, nav5];

// control navigation animation 
function navAnimation(direction1, direction2) {
    navItems.forEach((nav, i) => {
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
}


function toggleNav() {
    // toggle menu bars open/close
    menuBars.classList.toggle('change');
    // toggle menu active
    overLay.classList.toggle('overlay-active');
    if(overLay.classList.contains('overlay-active')) {
        // overlay animate in
        overLay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        // animate in nav items
        navAnimation('out', 'in');
    } else {
        // animate out overlay
        overLay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        // animate out nav items
        navAnimation('in', 'out');
    }
}

// event listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach(nav => {
    nav.addEventListener('click', toggleNav);
});