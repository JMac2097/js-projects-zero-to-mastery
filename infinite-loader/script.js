const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// unsplash API
const count = 30;
const apiKey = '_oy5K3WwxmERSJk9iq4W07DzdTKlNmGCxTveOqM77lg';
const apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images have loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}

// helper function to se attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    console.log('more total images:' , totalImages);
    totalImages = photosArray.length;
    console.log('totalImages: ', totalImages);
    photosArray.forEach((photo) => {
        console.log(1);
        // create an <a> to link to unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        console.log('item', item);
        // create image for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        console.log('img', img);
        // check when each has finished loading
        img.addEventListener('load', imageLoaded);
        // put image inside the anchor element, then put both inside of image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos();

    } catch (error) {
        // catch error here
    }
}

// check to see if we are scrolling near the bottom of the page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();