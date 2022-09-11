const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let timerId = null;
stopBtnEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBackgroundColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
};

startBtnEl.addEventListener('click', () => {
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;

    changeBackgroundColor();

    timerId = setInterval(changeBackgroundColor, 1000);
});

stopBtnEl.addEventListener('click', () => {
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;

    clearInterval(timerId);
});