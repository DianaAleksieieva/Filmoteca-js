import { getMoviesArray, changeDate, changeGenres, updateGenres } from './getMoviesArray';
import moviesTpl from '../templates/photoCardsLibrary.hbs';
import { clearGalleryMarkup } from './utils';

import {mainEl, headerEl} from './constants';
import { getMovie } from './modal';

let watchedArr;
let queueArr;
const currentChosenMovie = {};
let currentContent;
let currentPage;

mainEl.alreadyWatched.onclick = function() {
    getMovie().then(function(value) {
        currentPage = localStorage.getItem('CurrentGalleryPage');
        watchedArr = JSON.parse(localStorage.getItem('Watched')) || [];
        addCurrentMovie(value);
        let index = checkMovieInLocalStorage(watchedArr);
        if (index !== -1) {
            mainEl.alreadyWatched.textContent = 'Add to watched';
            watchedArr.splice(index, 1);
        } else {
            mainEl.alreadyWatched.textContent = 'Remove from watched';
            watchedArr.push(currentChosenMovie);
        }
        localStorage.setItem('Watched', JSON.stringify(watchedArr));
        markupRefresh('Watched');
    });
};

mainEl.queueWatched.onclick = function () {
    getMovie().then(function(value) {
        currentPage = localStorage.getItem('CurrentGalleryPage');
        queueArr = JSON.parse(localStorage.getItem('Queue')) || [];
        addCurrentMovie(value);
        let index = checkMovieInLocalStorage(queueArr);
        if (index !== -1) {
            mainEl.queueWatched.textContent = 'Add to queue';
            queueArr.splice(index, 1);
        } else {
            mainEl.queueWatched.textContent = 'Remove from queue';
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
    currentChosenMovie.original_title = value.original_title;
    currentChosenMovie.release_date = value.release_date;
    currentChosenMovie.genres = convertGenres();
    currentChosenMovie.vote_average = value.vote_average;

    function convertGenres() { 
        let genresList = value.genres.map(genre => genre.name);
        if (genresList.length > 3) {
            genresList.length = 3;
            genresList.splice(2, 1, 'Other');
            return genresList.join();
        } else {
            return genresList.join();
        }
    }
}

function checkMovieInLocalStorage(array) {
    const duplicateMovie = array.findIndex(movie => movie.id === currentChosenMovie.id);
    return duplicateMovie;
}

mainEl.watched.addEventListener('click', openWatchedGallery);
mainEl.queue.addEventListener('click', openQueueGallery);

function watchedLibrary() {
    localStorage.setItem('CurrentGalleryPage', 'Watched');
    clearGalleryMarkup();
    currentContent = JSON.parse(localStorage.getItem('Watched')) || [];
    changeDate(currentContent);
    renderGalleryCards(currentContent);
}

function openWatchedGallery() {
    watchedLibrary();
    headerEl.watchedButton.classList.add('watched-queue__button--active');
    headerEl.queueButton.classList.remove('watched-queue__button--active');
}

mainEl.myLibraryBtn.onclick = function() {
    watchedLibrary();
};

function openQueueGallery() {
    headerEl.watchedButton.classList.remove('watched-queue__button--active');
    headerEl.queueButton.classList.add('watched-queue__button--active');
    localStorage.setItem('CurrentGalleryPage', 'Queue');
    clearGalleryMarkup();
    currentContent = JSON.parse(localStorage.getItem('Queue')) || [];
    changeDate(currentContent);
    renderGalleryCards(currentContent);
}

function renderGalleryCards(content) {
    mainEl.galleryContainer.insertAdjacentHTML('beforeend', moviesTpl(content));
}

function markupRefresh(page) {
    currentContent = JSON.parse(localStorage.getItem(page));
    if (currentPage === page) {
        clearGalleryMarkup();
        renderGalleryCards(currentContent);
    }
}