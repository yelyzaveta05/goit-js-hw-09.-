import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > new Date()) {
            startBtnEl.disabled = false;
        } else { 
            Notiflix.Notify.failure('Please choose a date in the future');
        };
    },
};

flatpickr(inputEl, options);
startBtnEl.addEventListener('click', startTimer);

function pad(value) {
    return String(value).padStart(2, '0');
}

function startTimer() {
    startBtnEl.disabled = true;

    const timerId = setInterval(() => {
        const selectedDay = inputEl._flatpickr.selectedDates[0];
        const currentDay = new Date();
        const deltaTime = selectedDay - currentDay;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minsEl.textContent = pad(minutes);
        secsEl.textContent = pad(seconds);
    
        if(deltaTime < 0){
            clearInterval(timerId)
            startBtnEl.disabled = false;

            daysEl.textContent = pad(0);
            hoursEl.textContent = pad(0);
            minsEl.textContent = pad(0);
            secsEl.textContent = pad(0);
            return
            }
        }, 1000)
    return timerId
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = Math.floor(ms / day);
  // Remaining hours
    const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}