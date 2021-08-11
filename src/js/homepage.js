import { getMoviesArray } from './getMoviesArray';
import {
  galleryContainer,
  homeBtn,
  inputElement,
  MODE,
  myLibraryBtn,
  searchButtonElement,
  paginationContainer,
} from './constants';
import photoCardsTemplates from '../templates/photoCards.hbs';
import { onClickHomeBtn, onClickLibraryBtn } from './onClickHomeLibraryBtn';
import { clearGalleryMarkup } from './utils';
import { pagination } from './pagination';
let inputValue = '';
let currentContent = [];
let page = 1;

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
  });
};

const inputCallback = () => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
};

const renderCardfilm = content => {
  galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(content));
};
inputElement.addEventListener('input', inputCallback);
searchButtonElement.addEventListener('click', searchMoviesCallback);
//
myLibraryBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);
