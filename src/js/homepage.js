import Pagination from 'tui-pagination';
import { getMoviesArray } from './getMoviesArray';
import { galleryContainer, homeBtn, inputElement, MODE, myLibraryBtn, searchButtonElement, paginationContainer } from './constants';
import photoCardsTemplates from '../templates/photoCards.hbs';
import {onClickHomeBtn, onClickLibraryBtn} from './onClickHomeLibraryBtn';
import { clearGalleryMarkup } from './utils';
import { notificationFunc } from './notificationHeader';

let inputValue = '';
let currentContent = [];
let page = 1;

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


getMoviesArray(MODE.popular, inputValue, page).then(data => {
  currentContent = data;
  renderCardfilm(currentContent);
});

const searchMoviesCallback = ( ) => {
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

const inputCallback = ( ) => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
};

const renderCardfilm = content => {
  galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(content));
};
inputElement.addEventListener('input', inputCallback);
searchButtonElement.addEventListener('click', searchMoviesCallback);
myLibraryBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);