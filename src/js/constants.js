export const apiVariables = {
BASE_URL: 'https://api.themoviedb.org/3/',
API_KEY: 'api_key=02ffb45ff648e22333eeb14df43cb0e4',
GET_POPULAR: 'movie/popular',
GET_BY_NAME: 'search/movie/',
search: 'search',
popular: 'popular',
};

export const headerEl = {
SearchForm: document.querySelector('#search-form'),
inputElement: document.querySelector('.search-input'),
searchButtonElement: document.querySelector('.search-button'),
headerHome: document.querySelector('header'),
headerNavigationItemHome: document.querySelector('.navigation__item--home'),
headerNavigationItemLibrary: document.querySelector('.navigation__item--library'),
notificationMessage: document.querySelector('#message'),
watchedButton: document.querySelector('#watched-btn'),
queueButton: document.querySelector('#queue-btn'),
};

export const mainEl = {
paginationContainer: document.querySelector('#tui-pagination-container'),
galleryContainer: document.querySelector('.gallery'),
myLibraryBtn: document.querySelector('#library'),
homeBtn: document.querySelector('#home'),
WatchedQueueContainer: document.querySelector('#watched-queue-container'),
alreadyWatched: document.querySelector('#alreadyWatched'),
queueWatched: document.querySelector('#queueWatched'),
watched: document.querySelector('#watched-btn'),
queue: document.querySelector('#queue-btn'),
}


export const spiner = document.querySelector('#spiner');
export const spinerBackdrop = document.querySelector('#backdrop-spiner');
export const refsModal = {
    openModal: document.querySelector('.gallery'),
    closeModalBtn: document.querySelector('.modal-closeButton'),
    modal: document.querySelector('.modal-backdrop'),
    modalContainer: document.querySelector('.modal-container'),
};
export const DEBOUNCE_DELAY = 500;