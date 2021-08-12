import Pagination from 'tui-pagination';
import { paginationContainer } from './constants';
const optionsPagination = {
  itemsPerPage: 1,
  visiblePages: 10,
  centerAlign: true,

  page: 1,
};
export const pagination = new Pagination(paginationContainer, optionsPagination);