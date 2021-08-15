import { refsModal } from './constants';
import { BASE_URL } from './constants';
import { API_KEY } from './constants';
import axios from 'axios';
import modalTpl from '../templates/modalMovieCardTpl.hbs';
import {alreadyWatched, queueWatched} from './constants';

let movieCards;
let movieID;
let movieContent;

refsModal.closeModalBtn.addEventListener('click', modalClose);

refsModal.modal.addEventListener('click', event => {
    if (event.target !== refsModal.modal) {
        return;
    }
    modalClose();
});

const target = refsModal.openModal;
const config = {
    attributes: false,
    childList: true,
    subtree: false,
};

const callback = function(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            movieCards = document.querySelectorAll('.photo-card');
            movieCards.forEach(item => {
                item.addEventListener('click', modalOpen);
            });
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(target, config);


function modalOpen(event) {
    event.preventDefault();
    movieID = event.currentTarget.dataset.id;
    const watchedLocalStorage = JSON.parse(localStorage.getItem('Watched'));
    const queueLocalStorage = JSON.parse(localStorage.getItem('Queue'));

    getMovie().then(movieData => {
        movieContent = movieData;
        movieContent.mainGenre = movieContent.genres[0].name;
        refsModal.modalContainer.insertAdjacentHTML('afterbegin', modalTpl(movieContent));
        refsModal.modal.classList.toggle('is-hidden');
    });

    findDuplicates(watchedLocalStorage, queueLocalStorage);
    document.querySelector('body').classList.add('scroll-blocked');
    window.addEventListener('keydown', onEscKeydown);
}

function modalClose() {
    window.removeEventListener('keydown', onEscKeydown);
    refsModal.modal.classList.toggle('is-hidden');
    document.querySelector('body').classList.remove('scroll-blocked');
    setTimeout(() => {
       refsModal.modalContainer.innerHTML = ''; 
    }, 300);
    
}

function onEscKeydown(event) {
    if (event.code === 'Escape') {
        modalClose();
    }
}

export const getMovie = async() => {
    try {
        const response = await axios.get(`${BASE_URL}movie/${movieID}?${API_KEY}&language=en-US`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export function findDuplicates(watched, queue) {
    const duplicatesWatched = watched.findIndex(movie => movie.id == movieID);
    const duplicatesQueue = queue.findIndex(movie => movie.id == movieID);
    
    if (duplicatesWatched != -1) {
        alreadyWatched.textContent = 'Remove from watched'; 
    } else {
        alreadyWatched.textContent = 'Add to watched';
    }

    if (duplicatesQueue != -1) {
        queueWatched.textContent = 'Remove from queue';
    } else {
        queueWatched.textContent = 'Add to queue';
    }
}