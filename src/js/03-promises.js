import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayElement = document.querySelector('input[name="delay"]');
const delayStepElement = document.querySelector('input[name="step"]');
const amountElement = document.querySelector('input[name="amount"]');

Notiflix.Notify.init({
  fontSize: '30px',
  width: '500px',
  borderRadius: '10px',
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(firstDelayElement.value);
  let step = Number(delayStepElement.value);
  let amount = Number(amountElement.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms.`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms.`
        );
      });
    delay += step;
  }
}
