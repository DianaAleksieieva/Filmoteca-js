import { alreadyWatched } from './constants';
import { queueWatched } from './constants';

import { getMovie } from './modal';

alreadyWatched.onclick = function() {
    localStorage.setItem(
        'Watched',
        getMovie().then(function(value) {
            JSON.stringify(value);
        }),
    );
};

queueWatched.onclick = function() {
    localStorage.setItem(
        'Queue',
        getMovie().then(function(value) {
            JSON.stringify(value);
        }),
    );
};