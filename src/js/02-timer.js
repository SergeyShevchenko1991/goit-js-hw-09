import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const pickerRef = document.querySelector('#datetime-picker');
const startRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let endDate;
let timerId;
startRef.disabled = true;

startRef.addEventListener('click', function handleStart(evt) {
  timerId = setInterval(function () {
    renderTime(endDate);
    endDate -= 1000;
  }, 1000);
  evt.target.disabled = true;
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(timerId);
    const selectedDate = selectedDates[0].getTime();
    const currentTime = new Date().getTime();
    endDate = selectedDate - currentTime;
    if (endDate > 0) {
      startRef.disabled = false;
      return;
    }
    Notify.failure('Please choose a date in the future');
  },
};
flatpickr(pickerRef, options);

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

function renderTime(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
