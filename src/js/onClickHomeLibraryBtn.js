import { SearchForm } from './constants';
import { WatchedQueueContainer } from './constants';
import { headerHome,headerNavigationItemHome, headerNavigationItemLibrary } from './constants';
import { galleryContainer } from './constants';
import { clearGalleryMarkup } from './utils';
import { clearSpiner, showSpinner } from './spinner';

const onClickLibraryBtn = () => {
    console.log('qqqqqq');
    headerHome.classList.replace('header-home', 'header-library');
    WatchedQueueContainer.style.display = 'block';
    SearchForm.style.display = 'none';
    headerNavigationItemHome.classList.remove('navigation__item--current');
    headerNavigationItemLibrary.classList.add('navigation__item--current');
    showSpinner();
    clearSpiner();
    
    // galleryContainer.style.display = 'none';
    clearGalleryMarkup();


};
const onClickHomeBtn = () => {
    headerNavigationItemHome.classList.add('navigation__item--current');
    headerNavigationItemLibrary.classList.remove('navigation__item--current');
    headerHome.classList.replace('header-library', 'header-home');
    WatchedQueueContainer.style.display = 'none';
    SearchForm.style.display = 'inline-block';
    showSpinner();
    clearSpiner();
    //
    galleryContainer.style.display = 'block';

    localStorage.setItem('CurrentGalleryPage', 'Home');
};

export { onClickLibraryBtn, onClickHomeBtn };