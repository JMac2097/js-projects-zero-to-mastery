const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#bookmarks-container');

let bookmarks = [];
// show modal, focus on first input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal event listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target == modal ? modal.classList.remove('show-modal') : false));

// validate form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields');
        return false;
    }

    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address');
        return false;
    }
    // Valid
    return true;
}

 // build our bookmarks DOM
 function buildBookmarks() {
     // Clear previous bookmarks
     bookmarksContainer.textContent = '';
     // build items
     bookmarks.forEach(bookmark => {
        const { name, url } = bookmark;
        // item
        const item = document.createElement('div');
        item.classList.add('item');
        // close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-trash-alt');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // favicon / link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'favicon');
        // link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
     });
 }

// fetch bookmarks from local storage
function fetchBookmarks() {
    // get bookmarks from ls if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // create bookmarks array in local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));   
    }

    buildBookmarks();
}

// delete bookmark
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, index) => {
        if (bookmark.url === url) {
            bookmarks.splice(index, 1);
        }
    });
    // update bookmarks array, repopulate dom
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// handle data from form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    
    if (!validate(nameValue, urlValue)) {
        return false;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// event listner
bookmarkForm.addEventListener('submit', storeBookmark);

// on load fetch bookmarks
fetchBookmarks();