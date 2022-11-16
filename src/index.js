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

function onInput(e) {
  console.log(e.target.value);
  const inputName = e.target.value.trim();
  fetchCountries(inputName).then(renderCountriesCard).catch(onFetchError);
}

function renderCountriesCard(countries) {
  console.log('рисуем разметку', countries);
  let markup;
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  } else if (countries.length < 10 && countries.length > 1) {
    markup = countries
      .map(country => {
        return `
          <li class="country-item">
            <img src="${country.flag}" width= 40 height= 30 alt="${country.name}">
            <p>${country.name}</p>
          </li>
      `;
      })
      .join('');
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    markup = countries
      .map(country => {
        return `
            <div class="country-info-wrap">
              <img src="${country.flag}" width= 40 height= 30 alt="${
          country.name
        }">
              <p class="country-text">${country.name}</p>
            </div>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${country.languages.map(el => el.name)}</p>
      `;
      })
      .join('');
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = markup;
  }
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
