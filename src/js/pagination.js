import Pagination from 'tui-pagination';
import { mainEl } from './constants';
const optionsPagination = {
  totalItems: 1,
  itemsPerPage: 1,
  visiblePages: 5,
  centerAlign: true,
  page: 1,
  template: {
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">>></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const paginationAdaptive = () => {
  if (document.documentElement.clientWidth > 320) {
    optionsPagination.visiblePages = 9;
    return optionsPagination;
  } else {
    console.log(optionsPagination.visiblePages);
    return optionsPagination;
  }
};
export const pagination = new Pagination(mainEl.paginationContainer, paginationAdaptive());
export const hidePagination = () => {
  mainEl.paginationContainer.style.display = 'none';

};
export const showPagination = () => {
  mainEl.paginationContainer.style.display = 'block';

};
