const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;

const startColorChange = () => {
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled', 'true');
};

const stopColorChange = () => {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled', 'true');
  stopBtn.setAttribute('disabled', 'true');
};

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
