import Pagination from 'tui-pagination';
import { paginationContainer } from './constants';
const optionsPagination1 = {
  itemsPerPage: 1,
  visiblePages: 9,
  centerAlign: true,
  page: 1,
};
const optionsPagination2 = {
  itemsPerPage: 1,
  visiblePages: 5,
  centerAlign: true,
  page: 1,
};
const paginationAdaptive = () => {
  if (document.documentElement.clientWidth > 320) {
    return optionsPagination1;
  } else {
    return optionsPagination2;
  }
};
export const pagination = new Pagination(paginationContainer, paginationAdaptive());
