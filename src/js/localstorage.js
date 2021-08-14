import { alreadyWatched } from './constants';
import { queueWatched } from './constants';

import { getMovie } from './modal';

let watchedMassWithdrawal;
let queueMassWithdrawal;
const currentChosenMovie = {};

alreadyWatched.onclick = function() {
    getMovie().then(function (value) {
        watchedMassWithdrawal = JSON.parse(localStorage.getItem('Watched')) || [];
        addCurrentMovie(value);
        let index = checkMovieInLocalStorage(watchedMassWithdrawal);
        if (index !== -1) {
            watchedMassWithdrawal.splice(index, 1);
        } else {
            watchedMassWithdrawal.push(currentChosenMovie); 
        }
        localStorage.setItem('Watched', JSON.stringify(watchedMassWithdrawal));
    });
};

queueWatched.onclick = function() {
    getMovie().then(function(value) {
        queueMassWithdrawal = JSON.parse(localStorage.getItem('Queue')) || [];
        addCurrentMovie(value);
        let index = checkMovieInLocalStorage(queueMassWithdrawal);
        if (index !== -1) {
            queueMassWithdrawal.splice(index, 1);
        } else {
            queueMassWithdrawal.push(currentChosenMovie);
         }
        localStorage.setItem('Queue', JSON.stringify(queueMassWithdrawal));
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
    const duplicateMovie = array.findIndex(movie => movie.id === currentChosenMovie.id);
    return duplicateMovie;
}