import { apiVariables,refsModal, mainEl } from './constants';
import axios from 'axios';
import modalTpl from '../templates/modalMovieCardTpl.hbs';

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
        findDuplicates(watchedLocalStorage, queueLocalStorage);
    });

    
    document.querySelector('body').classList.add('scroll-blocked');
    window.addEventListener('keydown', onEscKeydown);
}

function modalClose() {
    window.removeEventListener('keydown', onEscKeydown);
    refsModal.modal.classList.toggle('is-hidden');
    document.querySelector('body').classList.remove('scroll-blocked');
    setTimeout(() => {
        document.querySelector('.modal-image-thumb').remove();
        document.querySelector('.modal-info').remove();
    }, 300);
    
}

function onEscKeydown(event) {
    if (event.code === 'Escape') {
        modalClose();
    }
}

export const getMovie = async() => {
    try {
        const response = await axios.get(`${apiVariables.BASE_URL}movie/${movieID}?${apiVariables.API_KEY}&language=en-US`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export function findDuplicates(watched, queue) {
    if (!watched) {
        mainEl.alreadyWatched.textContent = 'Add to watched';
    } else {
        const duplicatesWatched = watched.findIndex(movie => movie.id == movieID);
    if (duplicatesWatched != -1) {
        mainEl.alreadyWatched.textContent = 'Remove from watched'; 
    } else {
        mainEl.alreadyWatched.textContent = 'Add to watched';
    }}
    
    if (!queue) {
        mainEl.queueWatched.textContent = 'Add to queue';
    } else {
        const duplicatesQueue = queue.findIndex(movie => movie.id == movieID);
        if (duplicatesQueue != -1) {
        mainEl.queueWatched.textContent = 'Remove from queue';
    } else {
        mainEl.queueWatched.textContent = 'Add to queue';
    }}
}