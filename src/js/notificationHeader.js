import { notificationMessage } from './constants';
import { clearSpiner} from './spinner';

function clearNotification () {
    notificationMessage.classList.remove('active');
}

const notificationFunc = () => {
   
    notificationMessage.classList.add('active');
    clearSpiner();
    setTimeout(clearNotification, 6000 );
};

export { notificationFunc };