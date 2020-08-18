const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector('#nav');
const toggleIcon = document.querySelector('#toggle-icon');
const image1 = document.querySelector('#image1');
const image2 = document.querySelector('#image2');
const image3 = document.querySelector('#image3');
const textBox = document.querySelector('#text-box');

const darkTheme = 'dark';
const lightTheme = 'light';


//  Update images
function imageSwap (mode) {
    image1.src = `img/undraw_proud_coder_${mode}.svg`;
    image2.src = `img/undraw_feeling_proud_${mode}.svg`;
    image3.src = `img/undraw_conceptual_idea_${mode}.svg`; 
}

function toggleDarkLightMode(selectedTheme) {
    const isDark = selectedTheme === darkTheme;
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    isDark ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    isDark ? imageSwap('dark') : imageSwap('light');
}

// // Dark mode styles
// function darkMode() {
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//     imageSwap('dark');
// }

// // Light mode styles
// function lightMode() {
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     toggleIcon.children[0].textContent = 'Light Mode';
//     toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//     imageSwap('light');
// }

//  Switch theme dynamically
function switchTheme(event) {
    if(event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleDarkLightMode(darkTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleDarkLightMode(lightTheme);
    }
}

// Event listener
toggleSwitch.addEventListener('change', switchTheme);

// check localstorage for a theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if(currentTheme === 'dark') {
        toggleSwitch.checked = true;
        toggleDarkLightMode(darkTheme);
    }
}