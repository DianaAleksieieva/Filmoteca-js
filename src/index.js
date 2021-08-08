import './sass/main.scss';
import 'tui-pagination/dist/tui-pagination.css';
import './js/cardTemplates';
import { getMovies } from './js/getMovies';
import { MODE } from './js/constants';
import Pagination from 'tui-pagination';

const inputElement = document.querySelector('.search-input');
const searchButtonElement = document.querySelector('.search-button');
const paginationContainer = document.querySelector('#tui-pagination-container');

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
    console.log('No results found.');
  });
};

const inputEvent = () => {
  inputValue = inputElement.value.trim().replace(' ', '%20');
};

inputElement.addEventListener('input', inputEvent);
searchButtonElement.addEventListener('click', searchMoviesEvent);
