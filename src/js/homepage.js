import Pagination from 'tui-pagination';
import { getMoviesArray } from './getMoviesArray';
import { galleryContainer, homeBtn, inputElement, MODE, myLibraryBtn, searchButtonElement, paginationContainer, DEBOUNCE_DELAY } from './constants';
import photoCardsTemplates from '../templates/photoCards.hbs';
import {onClickHomeBtn, onClickLibraryBtn} from './onClickHomeLibraryBtn';
import { clearGalleryMarkup } from './utils';
import { notificationFunc } from './notificationHeader';
import debounce from 'lodash.debounce';


let inputValue = '';
let currentContent = [];

const optionsPagination = {
  itemsPerPage: 1,
  visiblePages: 10,
  page: 1,
};
const pagination = new Pagination(paginationContainer, optionsPagination);
pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
});

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
    
    notificationFunc();
    
  });
};

const inputCallback = ( ) => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
  searchMoviesCallback();
};

inputElement.addEventListener('input', debounce(inputCallback,DEBOUNCE_DELAY));
searchButtonElement.addEventListener('click', searchMoviesCallback);
//
myLibraryBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);