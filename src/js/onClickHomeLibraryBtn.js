
const SearchForm = document.querySelector("#search-form");
const WatchedQueueContainer = document.querySelector("#watched-queue-container");
const headerHome = document.querySelector("header");

function onClickLibraryBtn () { 
     SearchForm.style.display = 'none';
     WatchedQueueContainer.style.display = 'block'; 
     headerHome.classList.replace('header-home', 'header-library');
    };

const onClickHomeBtn = () => {
    headerHome.classList.replace('header-library', 'header-home');
    WatchedQueueContainer.style.display = 'none'; 
    SearchForm.style.display = '';
};

export { onClickLibraryBtn, onClickHomeBtn };

