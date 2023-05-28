import Notiflix from 'notiflix';

const form = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay)});}
    

form.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  
  const delayI = document.querySelector('.form input[name = "delay"]');
  const stepI = document.querySelector('.form input[name = "step"]');
  const amountI = document.querySelector('.form input[name = "amount"]') ;

  const delay = parseInt(delayI.value);
  const step = parseInt(stepI.value);
  const amount = parseInt(amountI.value);
  
  
  for(let i = 1; i <= amount; i += 1) {
    createPromise(i,  delay + (i - 1) * step )
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);;
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });}
    evt.currentTarget.reset();
  })
