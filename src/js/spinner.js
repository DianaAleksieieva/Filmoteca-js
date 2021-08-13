import { spiner } from './constants';

function clearSpiner () {
   
    setTimeout(()=> { spiner.classList.add('hidden');}, 1000 );
  }
  
  function showSpinner() {
    spiner.classList.remove('hidden');
    
  };

  export { clearSpiner, showSpinner };