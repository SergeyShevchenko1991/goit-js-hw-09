import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({ position, delay });
      }, delay);
    });
  } else {
    // Reject
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        reject({ position, delay });
      }, delay);
    });
  }
}
const form = document.querySelector('.form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let delay = Number(delayRef.value);
  const step = Number(stepRef.value);
  const amount = Number(amountRef.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});
