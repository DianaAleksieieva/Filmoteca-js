import {
    btnUp,
  } from './constants';

function scrollTo(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),

        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
            else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function () {
        if (pageYOffset > 100) {
            btnUpShow();       
        } else {
            btnUpHide();
        }
    });

    btnUp.onclick = function (click) {
        click.preventDefault();
        scrollTo(0, 400);
    }
});

export const btnUpShow =() => {
    btnUp.classList.add('show');   
  }


export const btnUpHide =() => {
    btnUp.classList.remove('show');   
  }
  
  