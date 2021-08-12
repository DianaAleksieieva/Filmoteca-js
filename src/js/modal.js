import { refsModal } from './constants';
import { BASE_URL } from "./constants";
import { API_KEY } from './constants';
import axios from "axios";
import modalTpl from '../templates/modalMovieCardTpl.hbs';

let movieCards;
let movieID;
let movieContent;

refsModal.closeModalBtn.addEventListener('click', modalClose);

refsModal.modal.addEventListener('click', (event) => {
    if (event.target !== refsModal.modal) {
        return
    }
    modalClose();
});
 

const target = refsModal.openModal;
const config = {
    attributes: false,
    childList: true,
    subtree: false
};

const callback = function(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            movieCards = document.querySelectorAll('.photo-card');
            movieCards.forEach((item) => { item.addEventListener('click', modalOpen) });
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(target, config);



function modalOpen(event) {
    event.preventDefault();
    movieID = event.currentTarget.dataset.id;

    getMovie().then(movieData => {
        movieContent = movieData;
        movieContent.mainGenre = movieContent.genres[0].name;
        refsModal.modalContainer.insertAdjacentHTML('afterbegin', modalTpl(movieContent));
        console.log(movieContent.mainGenre);
    });

    refsModal.modal.classList.toggle('is-hidden');
    document.querySelector('body').classList.add('scroll-blocked');
    window.addEventListener('keydown', onEscKeydown);
}


function modalClose() {
    window.removeEventListener('keydown', onEscKeydown);
    refsModal.modal.classList.toggle('is-hidden');
    refsModal.modalContainer.innerHTML = '';
    document.querySelector('body').classList.remove('scroll-blocked');
}

function onEscKeydown(event) {
    if (event.code === 'Escape') {
        modalClose()
    }
}



const getMovie = async () => {
  try {
      const response = await axios.get(`${BASE_URL}movie/${movieID}?${API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}