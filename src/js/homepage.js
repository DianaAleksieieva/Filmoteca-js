import { getMoviesArray, changeDate, changeGenres, updateGenres } from './getMoviesArray';
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
import { clearSpiner, showSpinner } from './spinner';


let inputValue = '';
let currentContent = [];
let page = 1;
pagination.on('afterMove', event => {
  const page = event.page;
  if (!inputValue) {
    getMovies(MODE.popular, inputValue, page).then(response => {
      currentContent = response.data.results;

      changeDate(currentContent);
      changeGenres(currentContent);
      updateGenres(currentContent);
      clearGalleryMarkup();
      renderCardfilm(currentContent);
      smoothScroll();
    });
  } else {
    getMovies(MODE.search, inputValue, page).then(response => {
      currentContent = response.data.results;

      changeDate(currentContent);
      changeGenres(currentContent);
      updateGenres(currentContent);
      clearGalleryMarkup();
      renderCardfilm(currentContent);
      smoothScroll();
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
      clearSpiner();
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

searchButtonElement.addEventListener('click', () => {
  inputValue = inputElement.value.trim();
  if (!inputValue) {
    notificationFunc();
  } 
  else {
    showSpinner ();
  }
});
function smoothScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
