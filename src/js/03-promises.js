import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const btnSubmitEl = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      };
    }, delayEl);
  });
};

btnSubmitEl.addEventListener('click', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();

  let firstDelay = Number(delayEl.value);
  let delayStep = Number(stepEl.value);
  let amount = Number(amountEl.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayStep)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayStep += firstDelay
  }

  formEl.reset();
};