import { getMoviesArray, changeDate, changeGenres, updateGenres } from './getMoviesArray';
import {
  headerEl,
  mainEl,
  apiVariables,
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

localStorage.setItem('CurrentGalleryPage', 'Home');

pagination.on('afterMove', event => {
  const page = event.page;
  if (!inputValue) {
    getMovies(apiVariables.popular, inputValue, page).then(response => {
      currentContent = response.data.results;

      changeDate(currentContent);
      changeGenres(currentContent);
      updateGenres(currentContent);
      clearGalleryMarkup();
      renderCardfilm(currentContent);
      smoothScroll();
    });
  } else {
    getMovies(apiVariables.search, inputValue, page).then(response => {
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
getMoviesArray(apiVariables.popular, inputValue, page).then(data => {
  currentContent = data;
  renderCardfilm(currentContent);
});
const searchMoviesCallback = () => {
  if (!inputValue) {
    return;
  } else {
    showSpinner ();
  }

  getMoviesArray(apiVariables.search, inputValue, page).then(data => {
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
  inputValue = headerEl.inputElement.value.trim();
  searchMoviesCallback();
};

headerEl.inputElement.addEventListener('input', debounce(inputCallback, DEBOUNCE_DELAY));
headerEl.searchButtonElement.addEventListener('click', searchMoviesCallback);
//
mainEl.myLibraryBtn.addEventListener('click', onClickLibraryBtn);
mainEl.homeBtn.addEventListener('click', () => {
  onClickHomeBtn();
  mainEl.galleryContainer.innerHTML = "";
  getMoviesArray(apiVariables.popular, inputValue, page).then(data => {
    currentContent = data;
    renderCardfilm(currentContent);
  });
  headerEl.inputElement.value = '';
});
const renderCardfilm = content => {
  mainEl.galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(content));
};

headerEl.searchButtonElement.addEventListener('click', () => {
  inputValue = headerEl.inputElement.value.trim();
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
