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


//При нажатии по кнопке My Library пропадает input и появляются две кнопки(Начало)
const MyLibraryBtn = document.querySelector("#library");
const SearchForm = document.querySelector("#search-form");
const WatchedQueueContainer = document.querySelector("#watched-queue-container");
const headerHome = document.querySelector("header");

MyLibraryBtn.addEventListener('click', onlibrary);


function onlibrary () {
SearchForm.style.display = 'none';
WatchedQueueContainer.style.display = 'block'; 
headerHome.classList.replace('header-home', 'header-library');
console.log(headerHome);
}
