const resultsNav = document.querySelector('#resultsNav');
const favouritesNav = document.querySelector('#favouritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// nasa API
const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favourites = {};

function showContent(page) {
    window.scrollTo({top: 0, behavior: 'instant'});
    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favouritesNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favouritesNav.classList.remove('hidden');
    }
    loader.classList.add('hidden');

}

function createDOMNodes(page) {
    const currentArry = page === 'results' ? resultsArray : Object.values(favourites);

    currentArry.forEach(results => {
        // card container
        const card = document.createElement('div');
        card.classList.add('card');
        // link
        const link = document.createElement('a');
        link.href = results.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        // image 
        const image = document.createElement('img');
        image.src = results.url;
        image.alt = 'NASA picture of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = results.title;
        // save text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results') {
            saveText.textContent = 'Add to favourites';
            saveText.setAttribute('onclick', `saveFavourite('${results.url}')`);
        } else {
            saveText.textContent = 'Remove favourite';
            saveText.setAttribute('onclick', `removeFavourite('${results.url}')`);
        }

        // card text
        const cardText = document.createElement('p');
        cardText.textContent = results.explanation;
        // footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // date
        const date = document.createElement('strong');
        date.textContent = results.date;
        // copyright
        const copyrightResult = results.copyright === undefined ? '' : results.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;

        // append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

// update DOM
function updateDOM(page) {

    //  get values from local storage
    if (localStorage.getItem('nasaFavourites')) {
        favourites = JSON.parse(localStorage.getItem('nasaFavourites'));
    }
    imagesContainer.textContent = '';

    createDOMNodes(page);
    showContent(page);
}

// get ten images fron nasa API
async function getNasaPictures() {
    // show loader
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM('results');
    } catch (error) {
        // catch error here
        console.log(error);
    }
}

// add result to favourites
function saveFavourite(itemURL) {

    // loop through results array for fave
    resultsArray.forEach((item) => {
        if (item.url.includes(itemURL) && !favourites[itemURL]) {
            favourites[itemURL] = item;
            //  show save confirmation
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
            // set favourites in local storage
            localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
        }
    });

}

// remove from favourites
function removeFavourite(itemURL) {
    if (favourites[itemURL]) {
        delete favourites[itemURL];
        // set favourites in local storage
        localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
        updateDOM('favourites');
    }
}

getNasaPictures();