import './sass/main.scss';

import { getMovies } from './js/getMovies';
import { MODE } from './js/constants';

const inputElement = document.querySelector(".search-input");
const searchButtonElement = document.querySelector(".search-button");

let inputValue = "";
let currentContent = [];


getMovies(MODE.popular, inputValue).then(data => {
  currentContent = data;
  console.log(currentContent);
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


