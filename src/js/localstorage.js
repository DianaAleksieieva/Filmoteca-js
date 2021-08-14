import { alreadyWatched } from './constants';
import { queueWatched } from './constants';

import { getMovie } from './modal';

let watchedMassWithdrawal;
let queueMassWithdrawal;

let queueMass = [];
const currentChosenMovie = {};

alreadyWatched.onclick = function() {
    getMovie().then(function(value) {
        watchedMassWithdrawal = JSON.parse(localStorage.getItem('Watched')) || [];
        addCurrentMovie(value);
        if (checkMovieInLocalStorage(watchedMassWithdrawal).length >= 1) {
            return;
        }
        watchedMassWithdrawal.push(currentChosenMovie);
        localStorage.setItem('Watched', JSON.stringify(watchedMassWithdrawal));
    });
};

queueWatched.onclick = function() {
    getMovie().then(function(value) {
        queueMassWithdrawal = JSON.parse(localStorage.getItem('Queue')) || [];
        addCurrentMovie(value);
        if (checkMovieInLocalStorage(queueMassWithdrawal).length >= 1) {
            return;
        }
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