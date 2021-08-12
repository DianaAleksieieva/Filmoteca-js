import { getMoviesArray } from './getMoviesArray';
import {
  galleryContainer,
  homeBtn,
  inputElement,
  MODE,
  myLibraryBtn,
  searchButtonElement,
  DEBOUNCE_DELAY,
} from './constants';
import photoCardsTemplates from '../templates/photoCards.hbs';
import { onClickHomeBtn, onClickLibraryBtn } from './onClickHomeLibraryBtn';
import { clearGalleryMarkup } from './utils';
import { notificationFunc } from './notificationHeader';
import debounce from 'lodash.debounce';
import { pagination } from './pagination';
import { getMovies } from './getMovies';

let inputValue = '';
let currentContent = [];
let page = 1;
pagination.on('afterMove', event => {
  const page = event.page;
  if (!inputValue) {
    getMovies(MODE.popular, inputValue, page).then(response => {
      currentContent = response.data.results;

      clearGalleryMarkup();
      renderCardfilm(currentContent);
    });
  } else {
    getMovies(MODE.search, inputValue, page).then(response => {
      currentContent = response.data.results;

      clearGalleryMarkup();
      renderCardfilm(currentContent);
    });
  }
});
getMoviesArray(MODE.popular, inputValue, page).then(data => {
  currentContent = data;
  renderCardfilm(currentContent);
});
const searchMoviesCallback = () => {
  if (!inputValue) {
    return;
  }

  getMoviesArray(MODE.search, inputValue, page).then(data => {
    if (data.length > 0) {
      currentContent = data;
      clearGalleryMarkup();
      renderCardfilm(currentContent);
      return;
    }
    console.log('No results found.');

    notificationFunc();
  });
};

const inputCallback = () => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
  searchMoviesCallback();
};

inputElement.addEventListener('input', debounce(inputCallback, DEBOUNCE_DELAY));
searchButtonElement.addEventListener('click', searchMoviesCallback);
//
myLibraryBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);
const renderCardfilm = content => {
  galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(content));
};

searchButtonElement.addEventListener('click', () => {inputValue = inputElement.value.trim();
  if (!inputValue) {
    notificationFunc();
    }});
