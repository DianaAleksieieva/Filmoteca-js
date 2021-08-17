import { headerEl, mainEl } from './constants';
import { clearGalleryMarkup } from './utils';
import { clearSpiner, showSpinner } from './spinner';

const onClickLibraryBtn = () => {
    console.log('qqqqqq');
    headerEl.headerHome.classList.replace('header-home', 'header-library');
    mainEl.WatchedQueueContainer.style.display = 'block';
    headerEl.SearchForm.style.display = 'none';
    headerEl.headerNavigationItemHome.classList.remove('navigation__item--current');
    headerEl.headerNavigationItemLibrary.classList.add('navigation__item--current');
    showSpinner();
    clearSpiner();
    
    // galleryContainer.style.display = 'none';
    clearGalleryMarkup();
};
const onClickHomeBtn = () => {
    headerEl.headerNavigationItemHome.classList.add('navigation__item--current');
    headerEl.headerNavigationItemLibrary.classList.remove('navigation__item--current');
    headerEl.headerHome.classList.replace('header-library', 'header-home');
    mainEl.WatchedQueueContainer.style.display = 'none';
    headerEl.SearchForm.style.display = 'inline-block';
    showSpinner();
    clearSpiner();
    //
    mainEl.galleryContainer.style.display = 'block';

    localStorage.setItem('CurrentGalleryPage', 'Home');
};

export { onClickLibraryBtn, onClickHomeBtn };