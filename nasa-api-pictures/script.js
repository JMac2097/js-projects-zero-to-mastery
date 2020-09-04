const resultsNav = document.querySelector('#resultsNav');
const favouritesNav = document.querySelector('#favouritesNav');
const imagesContainer = document.querySelector('.images-container');
const savwConfirm = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// nasa API
const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// update DOM
function updateDOM() {
    resultsArray.forEach(results => {
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
        saveText.textContent = 'Add to favourites';
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

// get ten images fron nasa API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM();
    } catch (error) {
        // catch error here
        console.log(error);
    }
}


getNasaPictures();