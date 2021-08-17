import { headerEl } from './constants';
import { clearSpiner} from './spinner';

function clearNotification () {
    headerEl.notificationMessage.classList.remove('active');
}

const notificationFunc = () => {
   
    headerEl.notificationMessage.classList.add('active');
    clearSpiner();
    setTimeout(clearNotification, 6000 );
};

export { notificationFunc };