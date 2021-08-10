import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { paginationContainer } from './constants';
import { BASE_URL } from './constants';
import { API_KEY } from './constants';
import { GET_BY_NAME } from './constants';
import { GET_POPULAR } from './constants';
import { MODE } from './constants';

const optionsPagination = {
  itemsPerPage: 0,
  visiblePages: 10,
};
export const pagination = new Pagination(paginationContainer, optionsPagination);

pagination.on('afterMove', event => {
  const currentPage = event.page;
  fetchFilms(currentPage).then(data => renderImages(data.images));
});

function fetchFilms(page) {
  return fetch(`${BASE_URL}${GET_POPULAR}?${API_KEY}&page=${page}&per_page=20`)
    .then(res => res.json())
    .then(data => ({ films: data.hits, total: data.total_pages }));
}

function renderImages(films) {
  console.log('RENDER');
  console.log(films);
}
