import Pagination from 'tui-pagination';
import { getMoviesArray } from './getMoviesArray';
import { galleryContainer, homeBtn, inputElement, MODE, myLibraryBtn, searchButtonElement, paginationContainer } from './constants';
import photoCardsTemplates from '../templates/photoCards.hbs';
import {onClickHomeBtn, onClickLibraryBtn} from './onClickHomeLibraryBtn';
import { clearGalleryMarkup } from './utils';
import { pagination } from './pagination';
let inputValue = '';
let currentContent = [];


getMoviesArray(MODE.popular, inputValue).then(data => {
  currentContent = data;
  pagination.reset(currentContent.length);
  galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(currentContent));
});

const searchMoviesCallback = ( ) => {
  if (!inputValue) {
    return;
  }
  getMoviesArray(MODE.search, inputValue).then(data => {
    if (data.length > 0) {
      currentContent = data;
      clearGalleryMarkup();
      galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(currentContent));
      return;
    }
    console.log('No results found.');
  });
};

const inputCallback = ( ) => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
};

inputElement.addEventListener('input', inputCallback );
searchButtonElement.addEventListener('click', searchMoviesCallback);
//
myLibraryBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);