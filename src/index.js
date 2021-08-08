import './sass/main.scss';
import './js/cardTemplates';
import photoCardsTemplates from './templates/photoCards.hbs';
import { getMovies } from './js/getMovies';
import { MODE } from './js/constants';

const inputElement = document.querySelector(".search-input");
const searchButtonElement = document.querySelector(".search-button");
const galleryContainer = document.querySelector('.gallery');

let inputValue = "";
let currentContent = [];


getMovies(MODE.popular, inputValue).then(data => {
  currentContent = data;
  console.log(currentContent);
  galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(currentContent));
});


const searchMoviesEvent = () => {
  if (!inputValue) {
    return;
  }
  getMovies(MODE.search, inputValue).then(data => {
    if (data.length > 0) {
      currentContent = data;
      console.log(currentContent);
      return;
    }
    console.log("No results found.");
  })
}

const inputEvent = () => {
  inputValue = inputElement.value.trim().replace(" ", '%20');
}

inputElement.addEventListener("input", inputEvent);
searchButtonElement.addEventListener("click", searchMoviesEvent)


