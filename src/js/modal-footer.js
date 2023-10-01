import { btnUpHide, btnUpShow } from './scrollUp';

(() => {
  // document.body.style.overflow = 'hidden';
  const btns = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector(".team-modal-close-button"),
    modal: document.querySelector(".backdropp"),
  };

  btns.openModalBtn.addEventListener("click", openModal);
  
  function openModal() {
      btns.modal.classList.remove("is-hidden");
      window.addEventListener("keydown", onPressEscape);
      btns.closeModalBtn.addEventListener("click", closeModal);
    btns.modal.addEventListener("click", backdroppCloseModal);
    document.querySelector('body').classList.add('scroll-blocked');
    btnUpHide();
    // refs.body.classList.add('scroll-hidden');
    };
  function closeModal() {
    // refs.body.classList.remove('scroll-hidden');
    btns.closeModalBtn.removeEventListener("click", closeModal);
    btns.modal.classList.add("is-hidden");
    btns.modal.removeEventListener("click", closeModal);
  window.removeEventListener('keydown', onPressEscape);
  document.querySelector('body').classList.remove('scroll-blocked');
  btnUpShow();
  }
  function onPressEscape(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
  function backdroppCloseModal(event) {
    if (event.currentTarget === event.target) {
    closeModal();
  }
  }
})();