const inputContainer = document.querySelector('#input-container');
const countdownForm = document.querySelector('#countdownForm');
const dateEl = document.querySelector('#date-picker');

const countdownEl = document.querySelector('#countdown');
const countdownElTitle = document.querySelector('#countdown-title');
const countdownBtn = document.querySelector('#countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.querySelector('#complete');
const completeElInfo = document.querySelector('#complete-info');
const completeBtn = document.querySelector('#complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// set date input minimum with todays date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate countdown and complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
    
        // hide input
        inputContainer.hidden = true;
        // if the countdown has ended show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // else, show countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }

        console.log('counting');
    }, second);
}

// take values from form inputs
function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;  
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // check for valid date
    if (countdownDate === '') {
        alert('Please enter a date for the countdown');
    } else {
        // get the numer version of current date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// reset all values
function reset() {
    // hide countdowns and show inout
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // get countdown if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load, check local storage
restorePreviousCountdown();