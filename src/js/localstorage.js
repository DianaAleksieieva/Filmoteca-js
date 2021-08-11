import { alreadyWatched } from './constants';
import { queueWatched } from './constants';

// var obj = {
//     cardPicture: '',
// };

alreadyWatched.onclick = function() {
    localStorage.setItem('WATCHED', 1);
    // localStorage.removeItem('WATCHED');
    // console.log('qwe');
};

queueWatched.onclick = function() {
    localStorage.setItem('QUEUE', 2);
    // localStorage.removeItem('QUEUE');

    // console.log('qwe');
};