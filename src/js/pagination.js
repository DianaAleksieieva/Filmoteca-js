import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getMovies } from './getMovies';
import { paginationContainer } from './constants';

const optionsPagination = {
  itemsPerPage: 1,
  visiblePages: 10,
  page: 1,
};
export const pagination = new Pagination(paginationContainer, optionsPagination);
pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
});
