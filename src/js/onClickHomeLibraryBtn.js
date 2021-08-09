import { SearchForm } from './constants';
import { WatchedQueueContainer } from './constants';
import { headerHome } from './constants';

const onClickLibraryBtn = () => {
  SearchForm.style.display = 'none';
  WatchedQueueContainer.style.display = 'block';
  headerHome.classList.replace('header-home', 'header-library');
}
const onClickHomeBtn = () => {
  headerHome.classList.replace('header-library', 'header-home');
  WatchedQueueContainer.style.display = 'none';
  SearchForm.style.display = '';
}

export { onClickLibraryBtn, onClickHomeBtn};

