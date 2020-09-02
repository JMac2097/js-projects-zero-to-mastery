const form = document.querySelector('#form');
const password1El = document.querySelector('#password1');
const password2El = document.querySelector('#password2')
const messageContainer = document.querySelector('.message-container');
const message = document.querySelector('#message');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
    // using constraint api
    isValid = form.checkValidity();
    if (!isValid) {
        // style main message for an error
        message.textContent = 'Please fill out all fields!';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    }

    // check if passwords match
    if (password1El.value === password2El.value) {
        passwordsMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    } else {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        return;
    }

    // if form is valid and passwords match
    if (isValid && passwordsMatch) {
        message.textContent = 'Successfully Registered!';
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}

function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    };
    // do something with user data
    console.log(user);
}


function processFormData(e) {
    e.preventDefault();
    validateForm();
    // submit dat if valid
    if (isValid && passwordsMatch) {
        storeFormData();
    }
}

// event listener
form.addEventListener('submit', processFormData);