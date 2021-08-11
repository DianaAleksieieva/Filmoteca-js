import { notificationMessage } from './constants';

function clearNotification () {
    notificationMessage.classList.remove('active');
}

const notificationFunc = () => {
   
    notificationMessage.classList.add('active');
    setTimeout(clearNotification, 6000 );
};

export { notificationFunc };