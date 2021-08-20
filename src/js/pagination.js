import Pagination from 'tui-pagination';
import { mainEl } from './constants';
const optionsPagination = {
  visiblePages: 5,
  centerAlign: true,
};

export const pagination = new Pagination(mainEl.paginationContainer, optionsPagination);
export const hidePagination = () => {
  mainEl.paginationContainer.classList.add('tui-hidden');
};
export const showPagination = () => {
  mainEl.paginationContainer.classList.remove('tui-hidden');
};
