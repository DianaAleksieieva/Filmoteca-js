import { alreadyWatched } from './constants';
import { queueWatched } from './constants';

import { getMovie } from './modal';

let watchedMass;
let queueMass = [];
const currentChosenMovie = {};

alreadyWatched.onclick = function() {
    getMovie().then(function (value) {
        watchedMass = JSON.parse(localStorage.getItem('Watched')) || [];
        addCurrentMovie(value);
        if (checkMovieInLocalStorage(watchedMass).length >= 1) {
            return
        };
        watchedMass.push(currentChosenMovie);
        localStorage.setItem('Watched', JSON.stringify(watchedMass));
    });
};

queueWatched.onclick = function() {
    getMovie().then(function(value) {
        addCurrentMovie(value);
        queueMass.push(currentChosenMovie);
        localStorage.setItem('Queue', JSON.stringify(queueMass));
    });
};

function addCurrentMovie(value) {
    currentChosenMovie.id = value.id;
    currentChosenMovie.backdrop_path = value.backdrop_path;
    currentChosenMovie.poster_path = value.poster_path;
    currentChosenMovie.title = value.title;
    currentChosenMovie.release_date = value.release_date;
    currentChosenMovie.genres = value.genres;
}

function checkMovieInLocalStorage(array) {
    const duplicateMovie = array.filter(movie => movie.id === currentChosenMovie.id);
    return duplicateMovie;
}