import { headerEl, mainEl } from './constants';
import { clearGalleryMarkup } from './utils';
import { clearSpiner, showSpinner } from './spinner';
import { hidePagination, showPagination } from './pagination';

const onClickLibraryBtn = () => {
    headerEl.headerHome.classList.replace('header-home', 'header-library');
    mainEl.WatchedQueueContainer.style.display = 'block';
    headerEl.SearchForm.style.display = 'none';
    headerEl.headerNavigationItemHome.classList.remove('navigation__item--current');
    headerEl.headerNavigationItemLibrary.classList.add('navigation__item--current');
    headerEl.watchedButton.classList.add('watched-queue__button--active');
    clearSpiner();
    hidePagination();
    clearGalleryMarkup();
};
const onClickHomeBtn = () => {
    headerEl.headerNavigationItemHome.classList.add('navigation__item--current');
    headerEl.headerNavigationItemLibrary.classList.remove('navigation__item--current');
    headerEl.headerHome.classList.replace('header-library', 'header-home');
    mainEl.WatchedQueueContainer.style.display = 'none';
    headerEl.SearchForm.style.display = 'inline-block';
    clearSpiner();
    showPagination();

    localStorage.setItem('CurrentGalleryPage', 'Home');
};

export { onClickLibraryBtn, onClickHomeBtn };