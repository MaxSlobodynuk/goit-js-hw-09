import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const dateField = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');


const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countDownTime = null;
let deltaTime = null;
let timerID;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const startDate = new Date();
        if(selectedDates[0] - startDate < 0){
            startBtn.disabled = true;
            Notify.failure('Select the date in the FUTURE');
        }

        else {
            startBtn.disabled = false;
            countDownTime = selectedDates[0];
        }
    },
};

flatpickr(dateField, options);

startBtn.addEventListener('click', onStart);

function onStart(evt) {
    startBtn.disabled = true;
    dateField.disabled = true;

    timerID = setInterval(() => {
        const currentDate = Date.now();
        deltaTime = countDownTime - currentDate;
        const time = convertMs(deltaTime);
        updateTimer(time);

        }, 1000); 
};

function updateTimer({ days, hours, minutes, seconds }) {
    if(deltaTime < 0){
        clearInterval(timerID);
        startBtn.disabled = false;
        dateField.disabled = false;
        return;
    }

    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;

    // daysEl.textContent = addLeadingZero(days);
    // hoursEl.textContent = addLeadingZero(hours);
    // minutesEl.textContent = addLeadingZero(minutes);
    // secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
