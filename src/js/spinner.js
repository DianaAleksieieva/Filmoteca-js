import { spiner } from './constants';
import { spinerBackdrop } from './constants';

function clearSpiner () {
   
    setTimeout(()=> { 
      spiner.classList.add('hidden');
      spinerBackdrop.classList.add('is-hidden');
  }, 1000 );
  }
  
  function showSpinner() {
    spiner.classList.remove('hidden');
    spinerBackdrop.classList.remove('is-hidden');
  };

  export { clearSpiner, showSpinner };