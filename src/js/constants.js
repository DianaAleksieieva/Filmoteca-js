export const BASE_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = 'api_key=02ffb45ff648e22333eeb14df43cb0e4';
export const GET_POPULAR = 'movie/popular';
export const GET_BY_NAME = 'search/movie/';
export const MODE = {
    search: 'search',
    popular: 'popular',
};
export const inputElement = document.querySelector('.search-input');
export const searchButtonElement = document.querySelector('.search-button');
export const paginationContainer = document.querySelector('#tui-pagination-container');
export const galleryContainer = document.querySelector('.gallery');
export const myLibraryBtn = document.querySelector('#library');
export const homeBtn = document.querySelector('#home');
export const SearchForm = document.querySelector('#search-form');
export const WatchedQueueContainer = document.querySelector('#watched-queue-container');
export const headerHome = document.querySelector('header');
export const headerNavigationItemHome = document.querySelector('.navigation__item--home');
export const headerNavigationItemLibrary = document.querySelector('.navigation__item--library');
export const notificationMessage = document.querySelector('#message');
export const spiner = document.querySelector('#spiner');

export const refsModal = {
    openModal: document.querySelector('.gallery'),
    closeModalBtn: document.querySelector('.modal-closeButton'),
    modal: document.querySelector('.modal-backdrop'),
    modalContainer: document.querySelector('.modal-container'),
};

export const alreadyWatched = document.querySelector('#alreadyWatched');
export const queueWatched = document.querySelector('#queueWatched');

export const watched = document.querySelector('#watched-btn');
export const queue = document.querySelector('#queue-btn');

export const DEBOUNCE_DELAY = 500;