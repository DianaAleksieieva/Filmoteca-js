import { refsModal } from './constants';
let movieCards;

    refsModal.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        refsModal.modal.classList.toggle('is-hidden');
    }



const target = refsModal.openModal;
const config = {
    attributes: false,
    childList: true,
    subtree: false
};

const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            movieCards = document.querySelectorAll('.photo-card')
            movieCards.forEach((item) => { item.addEventListener('click', toggleModal) })
            // movieCard.addEventListener('click', toggleModal);
            console.log(movieCards);
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(target, config);
