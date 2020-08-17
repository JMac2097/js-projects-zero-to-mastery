const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// disable/ewnable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// pass joke to voice rss api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '84b69feb76ad45d59ae8bb43a60eb301',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get joke from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text to speech
        tellMe(joke);
        // diable button
        toggleButton();
    } catch (err) {
        // catch errors
        console.log('whoops ', err);
    }
}


// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);