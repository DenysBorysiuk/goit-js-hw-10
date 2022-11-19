import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const inputName = refs.inputCountry.value.trim();
  if (inputName === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }
  fetchCountries(inputName).then(renderCountriesMarkup).catch(onFetchError);
}

function renderCountriesMarkup(countries) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length < 10 && countries.length > 1) {
    refs.countryList.innerHTML = countries
      .map(({ name, flag }) => {
        return `
          <li class="country-item">
            <img src="${flag}" width= 40 height= 30 alt="${name}">
            <p>${name}</p>
          </li>
      `;
      })
      .join('');
  } else if (countries.length === 1) {
    refs.countryInfo.innerHTML = countries
      .map(({ name, flag, capital, population, languages }) => {
        return `
          <div class="country-info-wrap">
           <img src="${flag}" width= 40 height= 30 alt="${name}">
           <p class="country-text">${name}</p>
          </div>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Languages:</b> ${languages.map(el => el.name)}</p>
      `;
      })
      .join('');
  }
}

function onFetchError(error) {
  console.log(error);
  Notify.failure('Oops, there is no country with that name');
}
