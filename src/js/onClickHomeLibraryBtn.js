
const SearchForm = document.querySelector("#search-form");
const WatchedQueueContainer = document.querySelector("#watched-queue-container");
const headerHome = document.querySelector("header");

// function onClicklibraryBtn () {
//     SearchForm.style.display = 'none';
//     WatchedQueueContainer.style.display = 'block'; 
//     headerHome.classList.replace('header-home', 'header-library');
//     }

function onClickLibraryBtn () { 
     SearchForm.style.display = 'none';
     WatchedQueueContainer.style.display = 'block'; 
     headerHome.classList.replace('header-home', 'header-library');};

const onClickHomeBtn = () => {

    console.log('Hello world');
};

export { onClickLibraryBtn, onClickHomeBtn };

// export default onClickLibraryBtn ;
// export default onClickHomeBtn ;