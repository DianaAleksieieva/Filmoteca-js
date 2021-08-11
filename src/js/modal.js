import { refsModal } from './constants';
import { BASE_URL } from "./constants";
import { API_KEY } from './constants';
import axios from "axios";
import modalTpl from '../templates/modalMovieCardTpl.hbs';

let movieCards;
let movieID;
let movieContent
refsModal.closeModalBtn.addEventListener('click', modalClose);



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
        refsModal.modalContainer.insertAdjacentHTML('afterbegin', modalTpl(movieContent));
        console.log(movieContent);
    });
    refsModal.modal.classList.toggle('is-hidden');
}


function modalClose() {
    refsModal.modal.classList.toggle('is-hidden');
    refsModal.modalContainer.innerHTML = '';
}



const getMovie = async () => {
  try {
      const response = await axios.get(`${BASE_URL}movie/${movieID}?${API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}