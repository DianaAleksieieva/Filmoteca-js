const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};



const body = document.querySelector('body');
const checkBox = document.querySelector('#theme-switch-toggle');
checkBox.addEventListener('change', themeSwitch);

function themeSwitch() {
    if (checkBox.checked) {
        body.classList.remove(Theme.LIGHT);
        body.classList.add(Theme.DARK);
        localStorage.setItem('theme', Theme.DARK);
        return;    
    }
        body.classList.remove(Theme.DARK);
        body.classList.add(Theme.LIGHT);
        localStorage.setItem('theme', Theme.LIGHT);
}

setCurrentTheme();

function setCurrentTheme() {
    if (localStorage.getItem('theme') === 'dark-theme') {
        body.classList.add(Theme.DARK);
        checkBox.checked = true;
    } else {
        body.classList.add(Theme.LIGHT);
    }
 }
