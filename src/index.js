import './sass/main.scss';
import 'tui-pagination/dist/tui-pagination.css';
import './js/cardTemplates';
import photoCardsTemplates from './templates/photoCards.hbs';
import { getMovies } from './js/getMovies';
import { MODE } from './js/constants';
import Pagination from 'tui-pagination';
import { onClickLibraryBtn, onClickHomeBtn }  from './js/onClickHomeLibraryBtn';


const inputElement = document.querySelector('.search-input');
const searchButtonElement = document.querySelector('.search-button');
const paginationContainer = document.querySelector('#tui-pagination-container');

const galleryContainer = document.querySelector('.gallery');

const myLibraryBtn = document.querySelector("#library");
const homeBtn = document.querySelector("#home");


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

getMovies(MODE.popular, inputValue).then(data => {
  currentContent = data;

  console.log(currentContent);
  pagination.reset(currentContent.length);

  galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(currentContent));

});

const searchMoviesEvent = () => {
  if (!inputValue) {
    return;
  }
  getMovies(MODE.search, inputValue).then(data => {
    if (data.length > 0) {
      currentContent = data; 
      clearGalleryMarkup();
      galleryContainer.insertAdjacentHTML('beforeend', photoCardsTemplates(currentContent));
        return;
    }
    console.log('No results found.');
  });
};

const inputEvent = () => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
};

inputElement.addEventListener('input', inputEvent);
searchButtonElement.addEventListener('click', searchMoviesEvent);

function clearGalleryMarkup() {
    galleryContainer.innerHTML = '';
   
};

//При нажатии по кнопке My Library (Home) пропадает input (появляется), меняется фон и появляются (пропадают) две кнопки(Начало)
myLibraryBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);
//(конец)


