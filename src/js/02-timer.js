import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputElement = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

Notiflix.Notify.init({
  fontSize: '30px',
  width: '500px',
  borderRadius: '10px',
});

btnStart.addEventListener('click', getSelectedTime);

function onClose(selectedDates) {
  const currentTime = Date.now();
  const ms = selectedDates[0] - currentTime;
  if (ms < 0) {
    Notiflix.Notify.failure('We can`t back to the past!');
  } else {
    btnStart.removeAttribute('disabled', 'true');
    Notiflix.Notify.success('Start counting');
  }
}

function getSelectedTime() {
  timerStart();
  btnStart.setAttribute('disabled', 'false');
}

function timerStart() {
  inputElement.setAttribute('disabled', 'true');
  const selectedDay = new Date(inputElement.value);
  const selectedTimeMs = selectedDay.getTime();

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTimeMs - currentTime;

    if (deltaTime < 0 && deltaTime > -1000) {
      clearInterval(intervalId);
      inputElement.removeAttribute('disabled', 'true');
      Notiflix.Notify.success('Time is up!');
    } else {
      updateTime(convertMs(deltaTime));
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function padDays(value) {
  if (value < 100) {
    return String(value).padStart(2, '0');
  }
  return String(value).padStart(3, '0');
}

function convertMs(time) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padDays(Math.floor(time / day));
  const hours = pad(Math.floor((time % day) / hour));
  const minutes = pad(Math.floor(((time % day) % hour) / minute));
  const seconds = pad(Math.floor((((time % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

flatpickr(inputElement, options);
function updateTime({ days, hours, minutes, seconds }) {
  spanDays.innerHTML = days;
  spanHours.innerHTML = hours;
  spanMinutes.innerHTML = minutes;
  spanSeconds.innerHTML = seconds;
}
