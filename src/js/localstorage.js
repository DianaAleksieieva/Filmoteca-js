import { alreadyWatched } from './constants';
import { queueWatched } from './constants';

import { getMovie } from './modal';

let watchedMass = [];
let queueMass = [];

alreadyWatched.onclick = function() {
    getMovie().then(function(value) {
        localStorage.setItem('Watched', JSON.stringify(value));
        watchedMass.push(value);
        localStorage.setItem('Watched', JSON.stringify(watchedMass));
    });
};

queueWatched.onclick = function() {
    getMovie().then(function(value) {
        localStorage.setItem('Queue', JSON.stringify(value));
        queueMass.push(value);
        localStorage.setItem('Queue', JSON.stringify(queueMass));
    });
};