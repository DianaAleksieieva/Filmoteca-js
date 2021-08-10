import { refsModal } from './constants';
function openModal() {
     
    refsModal.openModal.addEventListener('click', toggleModal);
    refsModal.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal(event) {
        event.preventDefault();
        refsModal.modal.classList.toggle('is-hidden');
    }
}
openModal()