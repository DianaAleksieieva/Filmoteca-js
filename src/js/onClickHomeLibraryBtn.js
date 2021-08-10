import { SearchForm } from './constants';
import { WatchedQueueContainer } from './constants';
import { headerHome } from './constants';
import { galleryContainer } from './constants';


const onClickLibraryBtn = () => {
    headerHome.classList.replace('header-home', 'header-library');
    WatchedQueueContainer.style.display = 'block';
    SearchForm.style.display = 'none';
    //
    galleryContainer.style.display = 'none';

};
const onClickHomeBtn = () => {
    headerHome.classList.replace('header-library', 'header-home');
    WatchedQueueContainer.style.display = 'none';
    SearchForm.style.display = '';
    //
    galleryContainer.style.display = 'block';
};

export { onClickLibraryBtn, onClickHomeBtn };