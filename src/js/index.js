const FormController = require('./form-controller');
const PriceCalculator = require('./price-calculator');
const VegvesenAPI = require('./vegvesen-api');

const form = document.getElementById('calcPriceForm');
const spinner = document.getElementById('spinner');
const priceOutput = document.getElementById('priceResult');
const errorOutput = document.getElementById('errorResult');

new FormController(form, (result) => {
  spinner.style.visibility = 'visible';
  priceOutput.value = '';

  PriceCalculator(result)
    .then(price => priceOutput.value = price)
    .catch(err => errorOutput.innerText = err.message)
    .finally(() => spinner.style.visibility = 'hidden');
});


const plateField = document.getElementById('plate');
const carInfo = document.getElementById('carinfo');
plateField.addEventListener('blur', (event) => {
  VegvesenAPI(event.target.value)
    .then(info => carInfo.innerText = info)
    .catch(err => console.error(error.message));
});

/* Toggle helper class for keyboard users */
document.addEventListener('keydown', (event) => {
  if (event.keyCode == 9) {
    document.body.classList.add('tab');
  };
});

document.addEventListener('click', (event) => {
  document.body.classList.remove('tab');
})