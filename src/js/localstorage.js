import { getMoviesArray, changeDate, changeGenres, updateGenres } from './getMoviesArray';
import genres from '../genres-list.json';
import moviesTpl from '../templates/photoCardsLibrary.hbs';
import { clearGalleryMarkup } from './utils';

import {
    alreadyWatched,
    galleryContainer,
    queueWatched,
    watched,
    queue,
    myLibraryBtn,
} from './constants';
import { getMovie } from './modal';

let watchedArr;
let queueArr;
const currentChosenMovie = {};
let currentContent;
let currentPage;

alreadyWatched.onclick = function() {
    getMovie().then(function(value) {
        currentPage = localStorage.getItem('CurrentGalleryPage');
        watchedArr = JSON.parse(localStorage.getItem('Watched')) || [];
        addCurrentMovie(value);
        let index = checkMovieInLocalStorage(watchedArr);
        if (index !== -1) {
            alreadyWatched.textContent = 'Add to watched';
            watchedArr.splice(index, 1);
        } else {
            alreadyWatched.textContent = 'Remove from watched';
            watchedArr.push(currentChosenMovie);
        }
        localStorage.setItem('Watched', JSON.stringify(watchedArr));
        markupRefresh('Watched');
    });
};

queueWatched.onclick = function() {
    getMovie().then(function(value) {
        currentPage = localStorage.getItem('CurrentGalleryPage');
        queueArr = JSON.parse(localStorage.getItem('Queue')) || [];
        addCurrentMovie(value);
        let index = checkMovieInLocalStorage(queueArr);
        if (index !== -1) {
            queueWatched.textContent = 'Add to queue';
            queueArr.splice(index, 1);
        } else {
            queueWatched.textContent = 'Remove from queue';
            queueArr.push(currentChosenMovie);
        }
        localStorage.setItem('Queue', JSON.stringify(queueArr));
        markupRefresh('Queue');
    });
};

function addCurrentMovie(value) {
    currentChosenMovie.id = value.id;
    currentChosenMovie.backdrop_path = value.backdrop_path;
    currentChosenMovie.poster_path = value.poster_path;
    currentChosenMovie.title = value.title;
    currentChosenMovie.release_date = value.release_date;
    currentChosenMovie.genres = value.genres;
    currentChosenMovie.vote_average = value.vote_average;
}

function checkMovieInLocalStorage(array) {
    const duplicateMovie = array.findIndex(movie => movie.id === currentChosenMovie.id);
    return duplicateMovie;
}

watched.addEventListener('click', openWatchedGallery);
queue.addEventListener('click', openQueueGallery);

function watchedLibrary() {
    localStorage.setItem('CurrentGalleryPage', 'Watched');
    clearGalleryMarkup();
    currentContent = JSON.parse(localStorage.getItem('Watched')) || [];
    changeDate(currentContent);
    renderGalleryCards(currentContent);
}

function openWatchedGallery() {
    
    watchedLibrary();
}

myLibraryBtn.onclick = function() {
    watchedLibrary();
};

function openQueueGallery() {
    localStorage.setItem('CurrentGalleryPage', 'Queue');
    clearGalleryMarkup();
    currentContent = JSON.parse(localStorage.getItem('Queue')) || [];
    changeDate(currentContent);
    renderGalleryCards(currentContent);
}

function renderGalleryCards(content) {
    galleryContainer.insertAdjacentHTML('beforeend', moviesTpl(content));
}

function markupRefresh(page) {
    currentContent = JSON.parse(localStorage.getItem(page));
    if (currentPage === page) {
        clearGalleryMarkup();
        renderGalleryCards(currentContent);
    }
}
